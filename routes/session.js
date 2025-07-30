const express = require('express');
const router = express.Router();
const Session = require('../models/Session');
const auth = require('../middleware/auth');

// ✅ PUBLIC — Get all published sessions for dashboard
router.get('/sessions', async (req, res) => {
  const sessions = await Session.find({ published: true });
  res.json(sessions);
});

// ✅ PRIVATE — Get all sessions for logged-in user (draft + published)
router.get('/my-sessions', auth, async (req, res) => {
  const sessions = await Session.find({ user_id: req.user.id });
  res.json(sessions);
});

// ✅ PRIVATE — Get one session by ID for logged-in user
router.get('/my-sessions/:id', auth, async (req, res) => {
  const session = await Session.findOne({
    _id: req.params.id,
    user_id: req.user.id,
  });

  if (!session) {
    return res.status(404).json({ message: 'Session not found' });
  }

  res.json(session);
});

// ✅ PRIVATE — Save or update draft
router.post('/my-sessions/save-draft', auth, async (req, res) => {
  const { _id, title, tags, json_file_url } = req.body;

  let session;

  if (_id) {
    // Update existing draft (MUST belong to user)
    session = await Session.findOne({
      _id,
      user_id: req.user.id,
    });

    if (!session) {
      return res.status(404).json({ message: 'Session not found' });
    }

    session.title = title;
    session.tags = tags;
    session.json_file_url = json_file_url;
  } else {
    // Create new draft
    session = new Session({
      title,
      tags,
      json_file_url,
      user_id: req.user.id,
      published: false,
    });
  }

  await session.save();
  res.json(session);
});

// ✅ PRIVATE — Publish session
router.post('/my-sessions/publish', auth, async (req, res) => {
  const { _id } = req.body;

  const session = await Session.findOne({
    _id,
    user_id: req.user.id,
  });

  if (!session) {
    return res.status(404).json({ message: 'Session not found' });
  }

  session.published = true;
  await session.save();

  res.json({ message: 'Session published', session });
});



module.exports = router;
