import express from "express";
import dotenv from "dotenv"
dotenv.config()
import morgan from "morgan";
import cors from "cors"
import connectDB from "./model/connect";
import route from "./route";

const app = express()
app.use("/static", express.static("static"));
app.use(cors())
app.use(morgan("dev"))
app.use(express.json())
app.listen(parseInt(process.env.port as string))

connectDB();
route(app)