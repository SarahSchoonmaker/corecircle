import { Request, Response } from "express";
import mongoose from "mongoose";
import User from "../models/User.js";
import FriendRequest from "../models/FriendRequest.js";

// ✅ Send Friend Request
export const sendRequest = async (
  req: Request & { user: string | mongoose.Types.ObjectId },
  res: Response
): Promise<void> => {
  try {
    const { recipientId } = req.body;
    const request = await FriendRequest.create({
      sender: req.user,
      recipient: recipientId,
    });
    res.status(201).json(request);
  } catch (err) {
    res.status(500).json({ msg: "Request failed", err });
  }
};

// ✅ Respond to Friend Request (accept/decline)
export const respondToRequest = async (
  req: Request & { user: string | mongoose.Types.ObjectId },
  res: Response
): Promise<void> => {
  try {
    const { requestId, accepted } = req.body;
    const request = await FriendRequest.findById(requestId);
    if (!request) {
      res.status(404).json({ msg: "Request not found" });
      return;
    }

    if (accepted) {
      await User.findByIdAndUpdate(request.sender, {
        $addToSet: { friends: request.recipient },
      });
      await User.findByIdAndUpdate(request.recipient, {
        $addToSet: { friends: request.sender },
      });
    }

    await request.deleteOne();
    res.json({ msg: accepted ? "Friend added" : "Request declined" });
  } catch (err) {
    res.status(500).json({ msg: "Failed to respond to request", err });
  }
};

// ✅ Get Pending Friend Requests for Current User
export const getFriendRequests = async (
  req: Request & { user: string | mongoose.Types.ObjectId },
  res: Response
): Promise<void> => {
  try {
    const requests = await FriendRequest.find({
      recipient: req.user,
    }).populate("sender", "name profilePicture");

    res.json(requests);
  } catch (err) {
    res.status(500).json({ msg: "Failed to fetch requests", err });
  }
};

// ✅ Get Friends of Current User
export const listFriends = async (
  req: Request & { user: string | mongoose.Types.ObjectId },
  res: Response
): Promise<void> => {
  try {
    const user = await User.findById(req.user).populate(
      "friends",
      "name profilePicture location"
    );

    if (!user) {
      res.status(404).json({ msg: "User not found" });
      return;
    }

    res.json(user.friends);
  } catch (err) {
    res.status(500).json({ msg: "Failed to list friends", err });
  }
};
