import express from "express";
import { uploadAndPredict } from "../controllers/predictions.controller.js";

const router = express.Router();

router.post("/upload", uploadAndPredict);

export default router;