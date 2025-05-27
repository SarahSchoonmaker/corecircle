import { Request, Response } from "express";
import Message from "../models/Message.js";
import { IUser } from "../models/User.js";

export const sendMessage = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const senderId = (req.user as IUser)._id;
    const { recipientId, content } = req.body;

    const message = await Message.create({
      sender: senderId,
      recipient: recipientId,
      content,
    });

    res.status(201).json(message);
  } catch (err) {
    res.status(500).json({ msg: "Failed to send message", err });
  }
};

export const getMessagesWithFriend = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const senderId = (req.user as IUser)._id;
    const { friendId } = req.params;

    const messages = await Message.find({
      $or: [
        { sender: senderId, recipient: friendId },
        { sender: friendId, recipient: senderId },
      ],
    }).sort({ createdAt: 1 });

    res.json(messages);
  } catch (err) {
    res.status(500).json({ msg: "Failed to load messages", err });
  }
};
