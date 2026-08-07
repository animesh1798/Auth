import { Router } from "express";
import { login, register, getUser, logout } from "../controllers/auth.controller.js";
import { loginValidation } from "../middleware/loginValidation.js";
import { registerValidation } from "../middleware/registerValidation.js";
import { tokenValidation } from "../middleware/auth.middleware.js";

const router: Router = Router();

router.post("/register", registerValidation, register);
router.post("/login", loginValidation, login);
router.get("/user", tokenValidation, getUser)
router.get("/user/logout", logout)

export default router;
