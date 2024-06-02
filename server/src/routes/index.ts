import express from "express";
import { contentRoutes } from "./content.routes";
import { userRoutes } from "./user.routes";
import { cartRoutes } from "./cart.routes";
import { orderRoutes } from "./order.routes";

const router = express.Router();

router.use("/user", userRoutes)
router.use("/contents", contentRoutes)
router.use("/carts", cartRoutes);
router.use("/orders", orderRoutes);


export default router