const express = require('express');
const router = express.Router();
const Member = require('../models/Member');
const authMiddleware = require('../middleware/auth');

// @route   GET /api/admin/stats
// @desc    Get dashboard stats
router.get('/stats', authMiddleware, async (req, res) => {
  try {
    const totalMembers = await Member.countDocuments();
    const activeMembers = await Member.countDocuments({ isExpired: false });
    const expiredMembers = await Member.countDocuments({ isExpired: true });
    const recentMembers = await Member.find({ isExpired: false })
      .sort({ addedAt: -1 })
      .limit(5);

    res.json({
      totalMembers,
      activeMembers,
      expiredMembers,
      recentMembers
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/admin/notifications
// @desc    Get expired members for notifications
router.get('/notifications', authMiddleware, async (req, res) => {
  try {
    const expiredMembers = await Member.find({ isExpired: true })
      .sort({ expiresAt: -1 })
      .limit(50);
    
    res.json(expiredMembers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/admin/members/:id/extend
// @desc    Extend member duration
router.put('/members/:id/extend', authMiddleware, async (req, res) => {
  try {
    const { additionalDays } = req.body;
    const member = await Member.findById(req.params.id);
    
    if (!member) {
      return res.status(404).json({ message: 'Member not found' });
    }

    member.expiresAt = new Date(member.expiresAt.getTime() + additionalDays * 24 * 60 * 60 * 1000);
    member.isExpired = false;
    await member.save();

    const io = req.app.get('io');
    io.emit('member:updated', member);

    res.json(member);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;