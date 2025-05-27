import { Request, Response } from "express";
import User from "../models/User.js";
import { IUser } from "../models/User.js";

export const getProfile = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const user = await User.findById((req.user as IUser)._id);
    if (!user) {
      res.status(404).json({ msg: "User not found" });
      return;
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ msg: "Server error", err });
  }
};

export const updateProfile = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const updates = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      (req.user as IUser)._id,
      updates,
      { new: true }
    );

    if (!updatedUser) {
      res.status(404).json({ msg: "User not found" });
      return;
    }

    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ msg: "Failed to update profile", err });
  }
};
