import {Schema, model} from 'mongoose';

const userSchema = new Schema (
  {
    username: {
      type: String,
      required: true,
      minlength: [2, 'Username must contain 2 letters at least.'],
      maxlength: [30, 'Username can not contain more than 30 letters.'],
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: [9, 'Password must contain 9 characters at least.'],
    },
    token: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default model ('User', userSchema);
