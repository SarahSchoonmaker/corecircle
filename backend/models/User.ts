// models/User.ts
import { Schema, model, Document, Types } from 'mongoose';

export interface IUser extends Document {
  email: string;
  password: string;
  name?: string;
  about?: string;
  profilePicture?: string;
  politicalView?: 'MAGA Republican' | 'Libertarian' | 'Mixture of Republican and Democrat ' | 'Democrat' | 'Undecided';
  religion?: string;
  relationshipStatus?: 'Single' | 'Married' | 'Divorced' | 'Widow';
  hasPets?: boolean;
  passions?: string[];
  interests?: string[];
  location?: {
    city?: string;
    state?: string;
  };
  friends: Types.ObjectId[];
}

const userSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String },
  about: { type: String },
  profilePicture: { type: String },
  politicalView: {
    type: String,
    enum: ['MAGA Republican', 'Libertarian', 'Mixture of Republican and Democrat', 'Democrat', 'Undecided'],
  },
  religion: { type: String },
  relationshipStatus: {
    type: String,
    enum: ['Single', 'Married', 'Divorced', 'Widow'],
  },
  hasPets: { type: Boolean },
  passions: [{ type: String }],
  interests: [{ type: String }],
  location: {
    city: { type: String },
    state: { type: String },
  },
  friends: [{ type: Schema.Types.ObjectId, ref: 'User' }],
}, { timestamps: true });

export default model<IUser>('User', userSchema);
