import jwt from 'jsonwebtoken';

const generateToken = userId => {
  return jwt.sign ({userId}, process.env.JWT_SECRET_KEY, {expiresIn: '1d'});
};

const isAuthorizedUser = (user, cart) => {
  user._id.toString () === cart.userId.toString ();
  if (!isAuthorizedUser)
    throw new Error ("Sorry, You're not authorized to manage this cart.");
};

export {generateToken, isAuthorizedUser};
