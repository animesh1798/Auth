import { Router } from "express";
import { login, register } from "../controllers/auth.controller";
import { loginValidation } from "../middleware/loginValidation";
import { registerValidation } from "../middleware/registerValidation";

const router = Router();

router.post("/register", registerValidation, register);
router.post("/login", loginValidation, login);

export default router;
