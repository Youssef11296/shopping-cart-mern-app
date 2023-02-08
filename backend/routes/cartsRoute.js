import {Router} from 'express';
import {addProductToCart, createCart} from '../controllers/cartsController.js';
import {isAuth} from '../middlewares/authMiddleware.js';

const router = Router ();

router.post ('/', isAuth, createCart);
router.patch ('/:cartId', isAuth, addProductToCart);

export default router;
