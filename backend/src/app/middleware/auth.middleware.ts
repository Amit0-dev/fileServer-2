import type { Response, Request, NextFunction } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";
import { env } from "../../env";
import { prisma } from "../../lib/prisma";
import type { DataStoredInToken } from "../../interfaces/dataInsideToken";
import type { RequestWithUser } from "../../interfaces/requestWithUser";

export const checkAuth = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
        const jwtToken = req.cookies.jwt;

        const decodedToken = jwt.verify(jwtToken, env.JWT_SECRET) as DataStoredInToken;

        console.log("Decoded token : ", decodedToken);

        const user = await prisma.user.findUnique({
            where: {
                id: decodedToken.id,
            },
        });

        if (user) {
            req.user = user;
            next();
        } else {
            return res.status(401).json({
                error: "Unauthorized",
            });
        }
    } catch (error) {
        return res.status(401).json({
            error: "Unauthorized",
        });
    }
};
