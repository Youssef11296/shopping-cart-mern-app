// modules
import asyncHandler from 'express-async-handler';
// models
import Cart from '../models/cartModel.js';

//* Cart Controller

// create cart
const createCart = asyncHandler (async (req, res) => {
  try {
    const {user} = req;

    const isAlreadyExistedCart = await Cart.findOne ({userId: user._id});

    if (isAlreadyExistedCart)
      throw new Error (
        `${user.username} already has his personal active cart.`
      );

    const newCart = await Cart.create ({
      userId: user._id,
      cartName: `${user.username}'s Cart`,
    });

    res.status (201).json ({
      success: true,
      message: 'Congrartulations, Your cart has been successfully created.',
      data: newCart,
    });
  } catch (error) {
    res.status (400).json ({success: false, message: error.message});
  }
});

// add product to cart
const addProductToCart = asyncHandler (async (req, res) => {
  try {
    const {user, params: {cartId}, body: {productName}} = req;

    const cart = await Cart.findOne ({_id: cartId});

    if (!cart) {
      res.status (404);
      throw new Error ('Cart not found.');
    }

    const isAuthorized = user._id.toString () === cart.userId.toString ();

    if (!isAuthorized)
      throw new Error ("Sorry, you're not authorized to manage this cart.");

    if (!productName || productName.length < 3 || productName.length > 30)
      throw new Error (
        'Product name is required and must contain in range from 3 to 30 letters.'
      );

    const isAlraedyListed = cart.productsList.find (
      product => product.productName === productName
    );

    if (isAlraedyListed) throw new Error ('This product already added.');

    const updatedCart = cart.$set ('productsList', [
      ...cart.productsList,
      {productName},
    ]);
    await updatedCart.save ();
    res.status (201).json ({
      success: true,
      message: 'Successfully added.',
      data: updatedCart,
    });
  } catch (error) {
    res.status (400).json ({success: false, message: error.message});
  }
});

// remove product from the cart
const removeProductFromCart = asyncHandler (async (req, res) => {
  try {
    const {user, params: {cartId, productId}} = req;

    const cart = await Cart.findOne ({_id: cartId});

    if (!cart) {
      res.status (404);
      throw new Error ('Cart not found.');
    }

    const isAuthorized = user._id.toString () === cart.userId.toString ();

    if (!isAuthorized)
      throw new Error ("Sorry, you're not authorized to manage this cart.");

    const islisted = cart.productsList.find (
      product => product._id.toString () === productId
    );

    if (!islisted)
      throw new Error (
        'Product not found in the cart, you may already removed it.'
      );

    const updatedCart = cart.$set (
      'productsList',
      cart.productsList.filter (
        product => product._id.toString () !== productId
      )
    );

    await updatedCart.save ();

    res.status (201).json ({
      success: true,
      message: 'Successfully removed.',
      data: updatedCart,
    });
  } catch (error) {
    res.status (400).json ({success: false, message: error.message});
  }
});

// exports
export {createCart, addProductToCart, removeProductFromCart};
