import { Router } from "express";

import userRoutes from './user.routes';
import productRoutes from './product.routes';

const router = Router();

router.use('/products', productRoutes);
router.use('/users', userRoutes);

export default router;