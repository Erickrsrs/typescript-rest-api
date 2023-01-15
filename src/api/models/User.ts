import { Document, Schema, Model, model } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
import isEmail from 'validator/lib/isEmail';
import bcryptjs from 'bcryptjs';

interface IUser extends Document {
  completeName: string;
  email: string;
  password: string;
  validatePassword: (pass: string) => boolean;
}

const UserSchema = new Schema<IUser>(
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
    password: {
      type: String,
      required: [true, 'is required'],
      minlength: [6, 'must be at least 6 characters'],
    },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    versionKey: false,
  },
);

UserSchema.plugin(uniqueValidator, { message: 'to be unique' });

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  if (this.password) {
    this.password = await bcryptjs.hash(this.password, 8);
  }
  return next();
});

UserSchema.methods.validatePassword = async function (pass: string) {
  return bcryptjs.compare(pass, this.password);
};

export const User: Model<IUser> = model<IUser>('User', UserSchema);
