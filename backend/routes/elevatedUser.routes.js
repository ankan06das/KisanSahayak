import express from "express";
import { updateThread } from "../controllers/elevatedUser.controller.js";
import verifyToken from "../middleware/protectRoute.js";

const router = express.Router();

router.patch("/update/:id", verifyToken, updateThread);

export default router;