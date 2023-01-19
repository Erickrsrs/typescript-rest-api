import { Document, Schema, Model, model } from 'mongoose';

interface IPhoto extends Document {
  id: boolean;
  originalname: string;
  filename: string;
  studentId: Schema.Types.ObjectId;
}

const PhotoSchema = new Schema<IPhoto>(
  {
    id: false, // because it was being duplicated
    originalname: {
      type: String,
      required: true,
    },
    filename: {
      type: String,
      required: true,
    },
    studentId: {
      type: Schema.Types.ObjectId,
      ref: 'Student',
      required: true,
    },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    versionKey: false,
    toJSON: { virtuals: true },
  },
);

PhotoSchema.virtual('url').get(function () {
  return 'http://localhost:3000/images/' + this.filename;
});

export const Photo: Model<IPhoto> = model<IPhoto>('Photo', PhotoSchema);
