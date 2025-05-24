// controllers/messageController.ts
import { Request, Response } from 'express';
import Message from '../models/Message';

interface AuthRequest extends Request {
  user?: string;
}

export const sendMessage = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { recipientId, content } = req.body;
    const message = await Message.create({ sender: req.user, recipient: recipientId, content });
    res.status(201).json(message);
  } catch (err) {
    res.status(500).json({ msg: 'Failed to send message', err });
  }
};

export const getMessages = async (req: AuthRequest, res: Response): Promise<void> => {
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
