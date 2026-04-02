import type { Request, Response } from "express";
import { z } from "zod";
import { prisma } from "../../../lib/prisma";

const userSchema = z.object({
    username: z.string().min(3),
    name: z.string().min(3),
    email: z.email(),
    password: z.string().min(6),
});

class AuthController {
    async signup(req: Request, res: Response) {
        const { data, success } = userSchema.safeParse(req.body);

        if (!success) {
            return res.status(400).json({
                error: "Invalid input format",
            });
        }

        const { email, name, username, password } = data;

        const user = await prisma.user.findFirst({
            where: { email, username },
        });

        console.log("User found : ", user);

        return res.status(200).json({
            success: true,
        });
    }

    async login(req: Request, res: Response) {
        // some code
    }

    async getCurrentLogggedInUser(req: Request, res: Response) {
        // some code
    }

    async logout(req: Request, res: Response) {
        // some code
    }
}

export default AuthController;
