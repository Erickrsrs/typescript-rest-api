import { Schema, model } from 'mongoose';

interface IStudent {
  name: string;
  lastName: string;
  email: string;
  age: number;
}

const studentSchema = new Schema<IStudent>(
  {
    name: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    age: { type: Number, required: true },
  },
  {
    versionKey: false,
  },
);

export const Student = model<IStudent>('Student', studentSchema);
