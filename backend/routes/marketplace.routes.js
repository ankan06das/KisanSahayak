import express from "express";
import verifyToken from "../middleware/protectRoute.js";
import { buyItem, getAllItems, getItemById, sellItem } from "../controllers/marketplace.controller.js";

const router = express.Router();

router.post("/sell", sellItem);
router.get("/explore/:id", getAllItems);
router.get("/:id", getItemById);
router.delete("/buy", buyItem);

export default router;