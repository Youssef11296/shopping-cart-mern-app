// modules
import asyncHandler from 'express-async-handler';
// models
import Cart from '../models/cartModel.js';
import {isAuthorizedUser} from '../utils/helpers.js';

//* Cart Controller

// get cart
const getMyCart = asyncHandler (async (req, res) => {
  try {
    const {user} = req;
    // getting the cart
    const cart = await Cart.findOne ({userId: user._id});
    if (!cart) res.status (404).send ('Cart not found.');
    // resonse
    res.status (200).json ({success: true, data: cart});
  } catch (error) {
    res.status (400).json ({success: false, message: error.message});
  }
});

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

    isAuthorizedUser (user, cart);

    if (!productName || productName.length < 3 || productName.length > 30)
      throw new Error (
        'Product name is required and must contain in range from 3 to 30 letters.'
      );

    const isAlreadyListed = cart.productsList.find (
      product => product.productName === productName
    );

    if (isAlreadyListed) throw new Error ('This product already added.');

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

    isAuthorizedUser (user, cart);

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

// edit product in the cart
const updateProductInCart = asyncHandler (async (req, res) => {
  try {
    const {user, params: {cartId, productId}, body: {productName}} = req;
    // get the cart
    const cart = await Cart.findOne ({_id: cartId});
    if (!cart) throw new Error ('Cart not found.');
    // check user auth
    isAuthorizedUser (user, cart);
    // get the product
    const product = cart.productsList.find (
      product => product._id.toString () === productId
    );
    if (!product)
      throw new Error (
        "This product does not exist in your cart or it's already removed."
      );
    // update the product
    cart.$set ('productsList', [
      ...cart.productsList.map (
        product =>
          product._id.toString () === productId ? {productName} : product
      ),
    ]);
    // save cart update
    await cart.save ();
    // response
    res
      .status (201)
      .json ({success: true, message: 'Successfully updated.', data: cart});
  } catch (error) {
    res.status (400).json ({success: false, message: error.message});
  }
});

// delete cart
const deleteCart = asyncHandler (async (req, res) => {
  try {
    const {user, params: {cartId}} = req;
    // getting the cart
    const cart = await Cart.findOne ({_id: cartId});
    if (!cart)
      res.status (404).send ({success: false, message: 'Cart not found.'});
    // checking user auth
    isAuthorizedUser (user, cart);
    // delete cart
    await cart.delete ();
    // response
    res.status (201).json ({success: true, message: 'Successfully deleted.'});
  } catch (error) {
    res.status (400).json ({success: false, message: error.message});
  }
});

// exports
export {
  getMyCart,
  createCart,
  addProductToCart,
  removeProductFromCart,
  updateProductInCart,
  deleteCart,
};
