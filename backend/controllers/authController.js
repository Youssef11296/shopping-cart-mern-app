// models
import User from '../models/userModel.js';
import asyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
import {generateToken} from '../utils/helpers.js';

//* Auth Controller

// regsiter user
const registerUser = asyncHandler (async (req, res) => {
  try {
    const {username, email, password} = req.body;
    // basic validation
    if (!username || username.length < 2 || username.length > 30)
      throw new Error (
        'Username is required and must contain from 2 to 30 letters.'
      );
    if (!email) throw new Error ('Email is required.');
    if (!password)
      throw new Error (
        'Password is required and must contain 9 characters at least.'
      );
    // checking if user already exist
    const isExistedUser =
      (await User.findOne ({username})) || (await User.findOne ({email}));
    if (isExistedUser)
      throw new Error (
        'User already exist. Please, retry with another username and email.'
      );
    // hashing password
    const hashedPassword = await bcrypt.hash (password, 10);
    // creating new user
    const newUser = await User.create ({
      username,
      email,
      password: hashedPassword,
    });
    // generating user token
    newUser.token = generateToken (newUser._id);
    // response
    res.status (201).json ({
      success: true,
      message: 'Successfully registered.',
      data: newUser,
    });
  } catch (error) {
    res.status (400).json ({success: false, message: error.message});
  }
});

export {registerUser};
