const express = require('express');
const Message = require('../models/Message');
const router = express.Router();

// Send a message
router.post('/send', async (req, res) => {
  try {
    const { sender, receiver, content } = req.body;
    const message = new Message({ sender, receiver, content });
    await message.save();
    res.status(201).json({ message: 'Message sent successfully', message });
  } catch (error) {
    res.status(400).json({ error: 'Error sending message' });
  }
});

// Get messages between two users
router.get('/conversation/:user1/:user2', async (req, res) => {
  try {
    const messages = await Message.find({
      $or: [
        { sender: req.params.user1, receiver: req.params.user2 },
        { sender: req.params.user2, receiver: req.params.user1 }
      ]
    }).sort('timestamp');
    res.json(messages);
  } catch (error) {
    res.status(400).json({ error: 'Error fetching messages' });
  }
});

module.exports = router;
