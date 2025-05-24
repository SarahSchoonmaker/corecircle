import { Request, Response } from 'express';
import User from '../models/User';
import FriendRequest from '../models/FriendRequest';
import mongoose from 'mongoose';


// Extend Express Request type to include authenticated user
interface AuthenticatedRequest extends Request {
  user: string | mongoose.Types.ObjectId;
}

export const sendRequest = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const { recipientId } = req.body;
    const request = await FriendRequest.create({
      sender: req.user,
      recipient: recipientId,
    });
    res.status(201).json(request);
  } catch (err) {
    res.status(500).json({ msg: 'Request failed', err });
  }
};

export const respondToRequest = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const { requestId, accepted } = req.body;
    const request = await FriendRequest.findById(requestId);
    if (!request) {
      res.status(404).json({ msg: 'Request not found' });
      return;
    }

    if (accepted) {
      await User.findByIdAndUpdate(request.sender, { $addToSet: { friends: request.recipient } });
      await User.findByIdAndUpdate(request.recipient, { $addToSet: { friends: request.sender } });
    }

    await request.deleteOne();
    res.json({ msg: accepted ? 'Friend added' : 'Request declined' });
  } catch (err) {
    res.status(500).json({ msg: 'Failed to respond to request', err });
  }
};

export const getFriendRequests = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const requests = await FriendRequest.find({ recipient: req.user }).populate('sender', 'name profilePicture');
    res.json(requests);
  } catch (err) {
    res.status(500).json({ msg: 'Failed to fetch requests', err });
  }
};
