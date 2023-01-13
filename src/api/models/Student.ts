import uniqueValidator from 'mongoose-unique-validator';
import { Schema, model } from 'mongoose';
import isEmail from 'validator/lib/isEmail';
import bcryptjs from 'bcryptjs';

interface IStudent {
  completeName: string;
  email: string;
  age: number;
  password: string;
}

const studentSchema = new Schema<IStudent>(
  {
    completeName: {
      type: String,
      required: [true, 'Name is required'],
      minlength: [3, 'Name must be at least 3 characters'],
      maxlength: [46, 'Name must be a maximum of 46 characters'],
    },
    email: {
      type: String,
      index: true,
      unique: true,
      required: [true, 'Email is required'],
      validate: [isEmail, 'Email invalid'],
    },
    age: { type: Number, required: [true, 'Age is required'] },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters'],
      maxlength: [46, 'Password must be a maximum of 46 characters'],
    },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    versionKey: false,
  },
);

studentSchema.plugin(uniqueValidator, { message: 'Email to be unique' });

studentSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcryptjs.hash(this.password, 8);
  return next();
});

export const Student = model<IStudent>('Student', studentSchema);
