// modules
import jwt from 'jsonwebtoken';
// models
import User from '../models/userModel.js';

const isAuth = async (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith ('Bearer')
    ) {
      token = req.headers.authorization.split (' ')[1];

      const decoded = jwt.verify (token, process.env.JWT_SECRET_KEY);

      req.user = await User.findOne ({_id: decoded.userId});
    }

    if (!token) {
      return res.status (401).send ('Not authorized, no token.');
    }

    next ();
  } catch (error) {
    res.status (401).send ('Not authorized.');
  }
};

export {isAuth};
