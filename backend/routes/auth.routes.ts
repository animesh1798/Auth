import { Router } from "express";
import { login, register, getUser } from "../controllers/auth.controller";
import { loginValidation } from "../middleware/loginValidation";
import { registerValidation } from "../middleware/registerValidation";
import { tokenValidation } from "../middleware/auth.middleware";

const router = Router();

router.post("/register", registerValidation, register);
router.post("/login", loginValidation, login);
router.get("/user/id", tokenValidation, getUser)

export default router;
