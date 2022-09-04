import UserController from "../controllers/UserController";
import { Router } from "express";
import multer from "multer";
import { Request } from "express";
import { v4 } from "uuid";
import authMiddleWare from "../middleware/auth.middleware";
type DestinationCallback = (error: Error | null, destination: string) => void;
type FileNameCallback = (error: Error | null, filename: string) => void;

const storage = multer.diskStorage({
    destination: (
        req: Request,
        file: Express.Multer.File,
        cb: DestinationCallback
    ) => {
        cb(null, "./static/avatar");
    },

    filename: (
        req: Request,
        file: Express.Multer.File,
        cb: FileNameCallback
    ) => {
        cb(null, v4() + file.originalname);
    },
});

const userRouter = Router();
userRouter.post(
    "/register",
    multer({ storage }).single("avatar"),
    UserController.register
);
userRouter.post("/login", UserController.login);
userRouter.get("/get-user-info",authMiddleWare ,UserController.getUserInfo);
export default userRouter;
