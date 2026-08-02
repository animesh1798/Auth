
import express, { Express } from "express";
import cors from "cors";

import {login, register} from './controllers/auth.controller'
import { registerValidation } from "./middleware/registerValidation";
import { loginValidation } from "./middleware/loginValidation";



const app: Express = express();

app.use(cors());
app.use(express.json());


app.post("/register", registerValidation, register);
app.post("/login", loginValidation, login);

app.listen(3000, () => console.log("Server running on port 3000"));
