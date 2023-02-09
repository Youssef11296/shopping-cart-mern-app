import Cart from '../models/cartModel';

const isExistedCart = async (req, res, next) => {
  const {params: {cartId}} = req;
  const cart = await Cart.findOne ({_id: cartId});
  if (!cart)
    res.status (404).send ({success: false, message: 'Cart not found.'});
  next ();
};

export {isExistedCart};
