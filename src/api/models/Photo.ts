import { Schema, model } from 'mongoose';

interface IPhoto {
  originalname: string;
  filename: string;
  studentId: Schema.Types.ObjectId;
}

const photoSchema = new Schema<IPhoto>(
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

photoSchema.virtual('url').get(function () {
  return 'http://localhost:3000/images/' + this.filename;
});

export const Photo = model<IPhoto>('Photo', photoSchema);
