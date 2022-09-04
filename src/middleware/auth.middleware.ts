import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

const authMiddleWare = (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    const authorization = request.headers.authorization as string;

    if (authorization) {
        try {
            const access_token = authorization.split(" ")[1];

            const data = verify(
                access_token,
                process.env.ACCESS_TOKEN_SECRET as string
            );
            if (data) {
                return next();
            } else {
                return response.status(500).json({ info: "not authen" });
            }
        } catch (error) {
            return response.status(500).json({ info: "not authen" });
        }
    }
    return response.status(500).json({ info: "not provided token" });
};

export default authMiddleWare;