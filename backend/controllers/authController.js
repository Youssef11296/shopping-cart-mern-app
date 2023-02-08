// modules
import bcrypt from 'bcryptjs';
import asyncHandler from 'express-async-handler';
// models
import User from '../models/userModel.js';
// helpers
import {generateToken} from '../utils/helpers.js';

//* Auth Controller

// regsiter user
const registerUser = asyncHandler (async (req, res) => {
  try {
    const {username, email, password} = req.body;
    if (username.includes (' ') || username.includes ('-') || username)
      if (!username || username.length < 2 || username.length > 30)
        // basic validation
        throw new Error (
          'Username is required and must contain from 2 to 30 letters.'
        );
    if (!email) throw new Error ('Email is required.');
    if (!password || password.length < 9)
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

// login user
const loginUser = asyncHandler (async (req, res) => {
  try {
    const {email, password} = req.body;
    if (!email) throw new Error ('Email is required.');
    if (!password)
      throw new Error (
        'Password is required and must contain 9 characters at least.'
      );
    // finding the user
    const user = await User.findOne ({email});
    if (!user) throw new Error ('User does not exist. Please, try register.');
    // comparing passwords
    if (user && !await bcrypt.compare (password, user.password))
      throw new Error ('Password is incorrect.');
    // response
    res.status (201).json ({
      success: true,
      message: 'Successfully logged in.',
      data: {
        username: user.username,
        email: user.email,
        token: generateToken (user._id),
      },
    });
  } catch (error) {
    res.status (400).json ({success: false, message: error.message});
  }
});

// get me
const getMe = asyncHandler (async (req, res) => {
  try {
    const {user} = req;
    const userData = await User.findOne ({_id: user._id});
    // response
    res.status (200).json ({
      success: true,
      data: {
        username: userData.username,
        email: userData.email,
      },
    });
  } catch (error) {
    res.status (400).json ({success: false, message: error.message});
  }
});

export {registerUser, loginUser, getMe};
