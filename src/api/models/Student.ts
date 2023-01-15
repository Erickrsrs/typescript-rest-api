import { Document, Schema, Model, Types, model } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
import isEmail from 'validator/lib/isEmail';
import bcryptjs from 'bcryptjs';

interface IStudent extends Document {
  completeName: string;
  email: string;
  age: number;
  password: string;
  photos: [{ _id: Types.ObjectId }];
}

const StudentSchema = new Schema<IStudent>(
  {
    completeName: {
      type: String,
      required: [true, 'is required'],
      minlength: [3, 'must be at least 3 characters'],
    },
    email: {
      type: String,
      required: [true, 'is required'],
      index: true,
      unique: true,
      validate: [isEmail, 'invalid'],
    },
    age: {
      type: Number,
      required: [true, 'is required'],
    },
    password: {
      type: String,
      required: [true, 'is required'],
      minlength: [6, 'must be at least 6 characters'],
    },
    photos: [
      {
        type: Schema.Types.ObjectId,
        required: false,
        ref: 'Photo',
        default: '',
      },
    ],
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    versionKey: false,
  },
);

StudentSchema.plugin(uniqueValidator, { message: 'Email to be unique' });

StudentSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcryptjs.hash(this.password, 8);
  return next();
});

export const Student: Model<IStudent> = model<IStudent>(
  'Student',
  StudentSchema,
);
