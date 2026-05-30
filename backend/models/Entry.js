const mongoose = require('mongoose');

// one entry per user per day
const entrySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    date: {
      type: String, // YYYY-MM-DD
      required: true,
    },
    mood: {
      type: String,
      enum: ['awful', 'bad', 'okay', 'good', 'great', null],
      default: null,
    },
    water: {
      type: Number,
      min: 0,
      max: 8,
      default: 0,
    },
    sleepStart: {
      type: String,
      default: '22:30',
    },
    sleepEnd: {
      type: String,
      default: '06:30',
    },
    exercise: {
      type: [String],
      default: [],
    },
    stress: {
      type: Number,
      min: 1,
      max: 10,
      default: 5,
    },
    notes: {
      type: String,
      default: '',
      maxlength: 1000,
    },
  },
  { timestamps: true }
);

// compound index so the same user can't have two entries for the same date
entrySchema.index({ user: 1, date: 1 }, { unique: true });

module.exports = mongoose.model('Entry', entrySchema);
