import { Schema, model, Types, Document } from 'mongoose';

export interface IMessage extends Document {
  sender: Types.ObjectId;
  recipient: Types.ObjectId;
  content: string;
  createdAt: Date;
}

const messageSchema = new Schema<IMessage>(
  {
    sender: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    recipient: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  }
);

const Message = model<IMessage>('Message', messageSchema);
export default Message;
