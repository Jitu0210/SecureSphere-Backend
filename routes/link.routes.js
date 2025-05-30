import express from "express";
import { checkLink, getHistory } from "../controllers/link.controller.js";
import protect from "../middlewares/auth.middleware.js";

const router = express.Router();

router.route("/check-link").post(protect, checkLink);
router.route("/link-history").get(protect, getHistory);

export default router;
