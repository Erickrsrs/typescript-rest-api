import mongoose, { Schema, model } from 'mongoose';

interface IPhoto {
  originalname: string;
  filename: string;
  studentId: mongoose.Schema.Types.ObjectId;
}

const photo = new Schema<IPhoto>(
  {
    originalname: {
      type: String,
      required: true,
    },
    filename: {
      type: String,
      required: true,
    },
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'students',
      required: true,
    },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    versionKey: false,
  },
);

export const Photo = model<IPhoto>('Photo', photo);
