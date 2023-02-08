import {Router} from 'express';
import {
  addProductToCart,
  createCart,
  removeProductFromCart,
} from '../controllers/cartsController.js';
import {isAuth} from '../middlewares/authMiddleware.js';

const router = Router ();

router.post ('/', isAuth, createCart);
router.patch ('/:cartId/productsList', isAuth, addProductToCart);
router.delete (
  '/:cartId/productsList/:productId',
  isAuth,
  removeProductFromCart
);

export default router;
