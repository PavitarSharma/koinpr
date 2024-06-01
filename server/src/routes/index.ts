import express from "express";
import { contentRoutes } from "./content.routes";

const router = express.Router();

router.use("/contents", contentRoutes)


export default router