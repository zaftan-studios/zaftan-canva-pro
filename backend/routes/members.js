const express = require('express');
const router = express.Router();
const Member = require('../models/Member');
const { body, validationResult } = require('express-validator');

// @route   GET /api/members
// @desc    Get all active members (public)
router.get('/', async (req, res) => {
  try {
    const members = await Member.find({ isExpired: false }).sort({ serialNumber: 1 });
    res.json(members);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/members/stats
// @desc    Get membership statistics (public)
router.get('/stats', async (req, res) => {
  try {
    const activeCount = await Member.countDocuments({ isExpired: false });
    const expiredCount = await Member.countDocuments({ isExpired: true });
    const TOTAL_SLOTS = 500;

    res.json({
      total: TOTAL_SLOTS,
      active: activeCount,
      expired: expiredCount,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/members/expired
// @desc    Get all expired members
router.get('/expired', async (req, res) => {
  try {
    const expiredMembers = await Member.find({ isExpired: true }).sort({ expiresAt: -1 });
    res.json(expiredMembers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/members
// @desc    Add a new member (admin only)
router.post('/', [
  body('email').isEmail().normalizeEmail(),
  body('days').isInt({ min: 1, max: 365 })
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, days } = req.body;

    const existingMember = await Member.findOne({ email, isExpired: false });
    if (existingMember) {
      return res.status(400).json({ message: 'This email is already an active member' });
    }

    const lastMember = await Member.findOne().sort({ serialNumber: -1 });
    const serialNumber = lastMember ? lastMember.serialNumber + 1 : 1;

    const expiresAt = new Date(Date.now() + days * 24 * 60 * 60 * 1000);

    const member = new Member({
      email,
      days: parseInt(days),
      expiresAt,
      serialNumber
    });

    await member.save();
    
    const io = req.app.get('io');
    io.emit('member:added', member);

    res.status(201).json(member);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE /api/members/:id
// @desc    Remove a member (admin only)
router.delete('/:id', async (req, res) => {
  try {
    const member = await Member.findById(req.params.id);
    if (!member) {
      return res.status(404).json({ message: 'Member not found' });
    }

    await Member.findByIdAndDelete(req.params.id);
    
    const io = req.app.get('io');
    io.emit('member:removed', { id: req.params.id });

    res.json({ message: 'Member removed successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/members/check-expired
// @desc    Check and update expired members
router.get('/check-expired', async (req, res) => {
  try {
    const now = new Date();
    const expiredMembers = await Member.find({
      isExpired: false,
      expiresAt: { $lte: now }
    });

    const expiredIds = [];
    for (const member of expiredMembers) {
      member.isExpired = true;
      await member.save();
      expiredIds.push({
        id: member._id,
        email: member.email,
        serialNumber: member.serialNumber,
        expiredAt: member.expiresAt
      });
    }

    if (expiredIds.length > 0) {
      const io = req.app.get('io');
      io.emit('members:expired', expiredIds);
    }

    res.json({ 
      message: `${expiredIds.length} members expired`,
      expiredMembers: expiredIds
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;