import { Router } from "express";
import { loginUser, registerUser, logoutUser } from "../controllers/authController.js";
import { userRegisterValidator, userLoginValidator } from "../validator/index.js"

const router = Router();

router.route("/register").post(userRegisterValidator(), registerUser);
router.route("/login").post(userLoginValidator(), loginUser);
router.route("/logout").post(logoutUser);

export default router;