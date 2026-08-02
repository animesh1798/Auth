import dotenv from "dotenv";
import express, { Express } from "express";
import cors from "cors";
import data from "./data/db";
import {login, register} from './controllers/auth.controller.ts'
import { registerValidation } from "./middleware/registerValidation.ts";
import { loginValidation } from "./middleware/loginValidation";

const db = structuredClone(data);
dotenv.config();
const app: Express = express();

app.use(cors());
app.use(express.json());


app.post("/register", registerValidation, (req, res) => register(req, res, db));
app.post("/login", loginValidation, (req, res) => login(req, res, db));

app.listen(3000, () => console.log("Server running on port 3000"));
