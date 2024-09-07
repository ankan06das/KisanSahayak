import express from "express";
import verifyToken from "../middleware/protectRoute.js";
import { buyItem, getAllItems, getItemById, sellItem } from "../controllers/marketplace.controller.js";

const router = express.Router();

router.post("/sell", verifyToken, sellItem);
router.get("/explore", verifyToken, getAllItems);
router.get("/:id", verifyToken, getItemById);
router.delete("/buy", verifyToken, buyItem);

export default router;