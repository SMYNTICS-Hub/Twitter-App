import express from "express";
import { protectRoute } from "../middlewares/protectRoute.js";
import { getUserProfile } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/profile/:username", protectRoute, getUserProfile);
// router.get("/suggested", protectRoute, getUserProfile);
// router.post("/follow/:id", protectRoute, followAndUnfollow);
// router.post("/update", protectRoute, updateUserProfile);

export default router;
