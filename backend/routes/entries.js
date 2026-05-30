const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const Entry = require('../models/Entry');

// Helper: calculate sleep duration in hours
const calcSleepHours = (start, end) => {
  const [sh, sm] = start.split(':').map(Number);
  const [eh, em] = end.split(':').map(Number);
  let mins = eh * 60 + em - (sh * 60 + sm);
  if (mins < 0) mins += 24 * 60;
  return mins / 60;
};

// @route   POST /api/entries/:date
// @desc    Save or update entry for a specific date
// @access  Private
router.post('/:date', protect, async (req, res) => {
  const { date } = req.params;

  // Validate date format YYYY-MM-DD
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return res.status(400).json({ message: 'Invalid date format. Use YYYY-MM-DD' });
  }

  const { mood, water, sleepStart, sleepEnd, exercise, stress, notes } = req.body;

  try {
    // Upsert: update if exists, create if not
    const entry = await Entry.findOneAndUpdate(
      { user: req.user._id, date },
      { mood, water, sleepStart, sleepEnd, exercise, stress, notes },
      { new: true, upsert: true, runValidators: true }
    );

    res.json({ message: 'Entry saved successfully', entry });
  } catch (error) {
    console.error('Save entry error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/entries/:date
// @desc    Get entry for a specific date
// @access  Private
router.get('/:date', protect, async (req, res) => {
  const { date } = req.params;

  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return res.status(400).json({ message: 'Invalid date format. Use YYYY-MM-DD' });
  }

  try {
    const entry = await Entry.findOne({ user: req.user._id, date });
    if (!entry) {
      return res.status(404).json({ message: 'No entry found for this date' });
    }
    res.json(entry);
  } catch (error) {
    console.error('Get entry error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/entries
// @desc    Get last 30 days of entries
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    const entries = await Entry.find({ user: req.user._id })
      .sort({ date: -1 })
      .limit(30);

    res.json(entries);
  } catch (error) {
    console.error('Get entries error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/entries/analytics/weekly
// @desc    Get weekly analytics (last 7 days) calculated server-side
// @access  Private
router.get('/analytics/weekly', protect, async (req, res) => {
  try {
    // Get last 7 days of entries
    const today = new Date();
    const dates = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      dates.push(d.toISOString().split('T')[0]);
    }

    const entries = await Entry.find({
      user: req.user._id,
      date: { $in: dates },
    });

    const n = entries.length;

    if (n === 0) {
      return res.json({ message: 'No entries in the last 7 days', data: null });
    }

    // Average water
    const avgWater = (entries.reduce((s, e) => s + e.water, 0) / n).toFixed(1);

    // Average sleep
    const avgSleep = (
      entries.reduce((s, e) => s + calcSleepHours(e.sleepStart, e.sleepEnd), 0) / n
    ).toFixed(1);

    // Average stress
    const avgStress = (entries.reduce((s, e) => s + e.stress, 0) / n).toFixed(1);

    // Top mood
    const moodCounts = {};
    entries.filter(e => e.mood).forEach(e => {
      moodCounts[e.mood] = (moodCounts[e.mood] || 0) + 1;
    });
    const topMood = Object.keys(moodCounts).length
      ? Object.entries(moodCounts).sort((a, b) => b[1] - a[1])[0][0]
      : null;

    // Active days (days with at least one exercise)
    const activeDays = entries.filter(e => e.exercise && e.exercise.length > 0).length;

    // Streak calculation
    let streak = 0;
    const entryDates = new Set(entries.map(e => e.date));
    const todayKey = today.toISOString().split('T')[0];
    let start = entryDates.has(todayKey) ? 0 : -1;
    for (let i = start; i >= -365; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() + i);
      const key = d.toISOString().split('T')[0];
      if (entryDates.has(key)) streak++;
      else break;
    }

    res.json({
      daysLogged: n,
      avgWater: parseFloat(avgWater),
      avgSleep: parseFloat(avgSleep),
      avgStress: parseFloat(avgStress),
      topMood,
      activeDays,
      streak,
      entries,
    });
  } catch (error) {
    console.error('Analytics error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/entries/export/json
// @desc    Export all user entries as JSON
// @access  Private
router.get('/export/json', protect, async (req, res) => {
  try {
    const entries = await Entry.find({ user: req.user._id }).sort({ date: -1 });

    res.setHeader('Content-Disposition', 'attachment; filename=habitpulse-export.json');
    res.setHeader('Content-Type', 'application/json');
    res.json({
      exportedAt: new Date().toISOString(),
      user: req.user.email,
      totalEntries: entries.length,
      entries,
    });
  } catch (error) {
    console.error('Export error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE /api/entries/:date
// @desc    Delete entry for a specific date
// @access  Private
router.delete('/:date', protect, async (req, res) => {
  const { date } = req.params;

  try {
    const entry = await Entry.findOneAndDelete({ user: req.user._id, date });
    if (!entry) {
      return res.status(404).json({ message: 'Entry not found' });
    }
    res.json({ message: 'Entry deleted successfully' });
  } catch (error) {
    console.error('Delete entry error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
