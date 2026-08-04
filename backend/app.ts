import express from "express";
import cors from "cors";
import router from "./routes/auth.routes";
import cookieParser from 'cookie-parser'

const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use(cookieParser())
app.use(express.json());

app.use("/", router);

export default app;
