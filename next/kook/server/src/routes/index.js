import { Router } from "express";
import authRoutes from "./authRoutes.js";
import verifyRoutes from "./verifyRoutes.js";
const router = Router();
router.use('/api', authRoutes);
router.use('/', verifyRoutes);
export default router;
