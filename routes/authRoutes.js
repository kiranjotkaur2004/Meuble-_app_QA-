import express from "express";
import {
  registercontroller,
  logincontroller,
  testcontroller,
  forgotPasswordController,
  getAllUsers,
} from "../controllers/authController.js";
import { isAdmin, requiresignin } from "../middlewares/authMiddlewares.js";
//router object
const router = express.Router();

//routing
//register: post method
router.post("/register", registercontroller);
//login: post method
router.post("/login", logincontroller);
//text routes
router.get("/test", requiresignin, isAdmin, testcontroller); //can add middleware before textcontroller // two middlewares in first token is checked and in second one isadmin checked
//forgot password || POST
router.post(`/forgot-password`, forgotPasswordController);
//protected user-route auth
router.get(`/user-auth`, requiresignin, (req, res) => {
  res.status(200).send({
    ok: true,
  });
});

//protected admin-route auth
router.get(`/admin-auth`, requiresignin, isAdmin, (req, res) => {
  res.status(200).send({
    ok: true,
  });
});
//for all users
router.get("/users", getAllUsers);
export default router;
