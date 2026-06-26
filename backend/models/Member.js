const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  days: {
    type: Number,
    required: true,
    min: 1
  },
  addedAt: {
    type: Date,
    default: Date.now
  },
  expiresAt: {
    type: Date,
    required: true
  },
  isExpired: {
    type: Boolean,
    default: false
  },
  serialNumber: {
    type: Number,
    required: true
  }
}, { timestamps: true });

// Auto-calculate expiresAt before saving (Mongoose 8+ syntax - no next callback)
memberSchema.pre('save', async function() {
  if (!this.expiresAt) {
    this.expiresAt = new Date(Date.now() + this.days * 24 * 60 * 60 * 1000);
  }
});

// Method to check if expired
memberSchema.methods.checkExpired = function() {
  const now = new Date();
  const expired = now >= this.expiresAt;
  if (expired && !this.isExpired) {
    this.isExpired = true;
    return true;
  }
  return false;
};

// Virtual for remaining days
memberSchema.virtual('remainingDays').get(function() {
  const now = new Date();
  const diff = this.expiresAt - now;
  if (diff <= 0) return 0;
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
});

// Virtual for remaining time string (00d 00h 00m 00s)
memberSchema.virtual('remainingTime').get(function() {
  const now = new Date();
  const diff = this.expiresAt - now;
  if (diff <= 0) return 'Expired';
  
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  
  return `${days}d ${hours}h ${minutes}m ${seconds}s`;
});

memberSchema.set('toJSON', { virtuals: true });
memberSchema.set('toObject', { virtuals: true });

module.exports = mongoose.models.Member || mongoose.model('Member', memberSchema);