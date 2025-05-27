// backend/models/FriendRequest.ts
import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IFriendRequest extends Document {
  sender: Types.ObjectId;
  recipient: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

const friendRequestSchema = new Schema<IFriendRequest>(
  {
    sender: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    recipient: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

// ✅ THIS is what makes it a module
export default mongoose.model<IFriendRequest>('FriendRequest', friendRequestSchema);
