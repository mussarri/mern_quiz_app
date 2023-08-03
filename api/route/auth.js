import express from "express";
import {
  registerController,
  loginController,
  refreshController,
  logoutController,
} from "../controller/auth.js";
const router = express.Router();

router.post("/register", registerController);
router.post("/login", loginController);
router.get("/refresh", refreshController);
router.get("/logout", logoutController);

export default router;
