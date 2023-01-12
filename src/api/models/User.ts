import uniqueValidator from 'mongoose-unique-validator';
import { Schema, model } from 'mongoose';
import isEmail from 'validator/lib/isEmail';
import bcryptjs from 'bcryptjs';

interface IUser {
  completeName: string;
  email: string;
  password: string;
  validatePassword: (pass: string) => boolean;
}

const userSchema = new Schema<IUser>(
  {
    completeName: {
      type: String,
      required: [true, 'Name is required'],
      minlength: [3, 'Name must be 3 or more characters'],
      maxlength: [46, 'Name must be a maximum of 46 characters'],
    },
    email: {
      type: String,
      index: true,
      unique: true,
      required: [true, 'Email is required'],
      validate: [isEmail, 'Email invalid'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be 3 or more characters'],
      maxlength: [46, 'Password must be a maximum of 46 characters'],
    },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    versionKey: false,
  },
);

userSchema.plugin(uniqueValidator, { message: 'Email to be unique' });

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  if (this.password) {
    this.password = await bcryptjs.hash(this.password, 8);
  }
  return next();
});

userSchema.methods.validatePassword = async function (pass: string) {
  return bcryptjs.compare(pass, this.password);
};

export const User = model<IUser>('User', userSchema);
