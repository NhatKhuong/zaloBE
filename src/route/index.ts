import { Express } from "express";
import userRouter from "./user";
const route = (app: Express) => {
    app.use("/user", userRouter);
};

export default route;
