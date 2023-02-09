import {Router} from 'express';
import {
  addProductToCart,
  createCart,
  deleteCart,
  getMyCart,
  removeProductFromCart,
  updateProductInCart,
} from '../controllers/cartsController.js';
import {isAuth} from '../middlewares/authMiddleware.js';

const router = Router ();

router.get ('/mycart', isAuth, getMyCart);
router.post ('/', isAuth, createCart);
router.patch ('/:cartId/productsList', isAuth, addProductToCart);
router.delete (
  '/:cartId/productsList/:productId',
  isAuth,
  removeProductFromCart
);
router.patch ('/:cartId/productsList/:productId', isAuth, updateProductInCart);
router.delete ('/:cartId', isAuth, deleteCart);

export default router;
