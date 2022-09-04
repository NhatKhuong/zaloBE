import { Request, Response } from "express";
import { User, userModel } from "../model/user";
import bcrypt from "bcrypt";
import { sign, verify } from "jsonwebtoken";

class UserController {
    register(request: Request, response: Response) {
        let { userName, password, email, fullName } = request.body;
        password = bcrypt.hashSync(password, 5);
        const avatar = request.file?.filename as string;
        const user = new userModel({
            userName,
            password,
            avatar,
            email,
            fullName,
        });
        user.save()
            .then((e) => {
                return response.status(200).json({ noti: "success" });
            })
            .catch((e) => {
                return response.status(500).json({ noti: "fail" });
            });
    }

    async login(request: Request, response: Response) {
        console.log(request.body);
        let { userName, password } = request.body;

        const user = await userModel.findOne({ userName });

        if (user) {
            const compare = bcrypt.compareSync(password, user.password);
            if (compare) {
                const access_token = sign(
                    { userName: user.userName },
                    process.env.ACCESS_TOKEN_SECRET + "",
                    { expiresIn: process.env.ACCESS_TOKEN_LIFE }
                );
                const refresh_token = sign(
                    { userName: user.userName },
                    process.env.REFRESH_TOKEN_SECRET + "",
                    { expiresIn: process.env.REFRESH_TOKEN_LIFE }
                );
                return response
                    .status(200)
                    .json({ info: "success", access_token, refresh_token });
            } else {
                return response.status(500).json({ noti: "password incorect" });
            }
        } else {
            return response
                .status(500)
                .json({ noti: "userName or password incorect" });
        }
    }

    async getUserInfo (request: Request, response: Response) {
        const access_token = request.headers.authorization?.split(" ")[1];
    
        const userName = (
            verify(
                access_token as string,
                process.env.ACCESS_TOKEN_SECRET as string
            ) as any
        ).userName;
        const user = await userModel.findOne({ userName });
        return response.status(200).json({ info: "success", user });
    };
}

export default new UserController();
