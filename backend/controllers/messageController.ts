// controllers/messageController.js
const Message = require('../models/Message');

exports.sendMessage = async (req, res) => {
  try {
    const { recipientId, content } = req.body;
    const message = await Message.create({ sender: req.user, recipient: recipientId, content });
    res.status(201).json(message);
  } catch (err) {
    res.status(500).json({ msg: 'Failed to send message', err });
  }
};

exports.getMessages = async (req, res) => {
  try {
    const { userId } = req.params;
    const messages = await Message.find({
      $or: [
        { sender: req.user, recipient: userId },
        { sender: userId, recipient: req.user }
      ]
    }).sort({ createdAt: 1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ msg: 'Failed to load messages', err });
  }
};
