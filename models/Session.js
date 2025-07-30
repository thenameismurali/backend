const mongoose = require('mongoose');

const SessionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  tags: [{ type: String }],
  json_file_url: { type: String },
  published: { type: Boolean, default: false },
  user_id: { type: String, required: true },
});

module.exports = mongoose.model('Session', SessionSchema);
