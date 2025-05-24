import { Request, Response } from 'express';
import User from '../models/User';

// Custom type if req.user is injected by auth middleware
interface AuthRequest extends Request {
  user: string; // assuming user is the user ID (string)
}

export const getProfile = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const user = await User.findById(req.user);
    if (!user) {
      res.status(404).json({ msg: 'User not found' });
      return;
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ msg: 'Server error', err });
  }
};

export const updateProfile = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const updates = req.body;
    const user = await User.findByIdAndUpdate(req.user, updates, { new: true });
    if (!user) {
      res.status(404).json({ msg: 'User not found' });
      return;
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ msg: 'Update failed', err });
  }
};
