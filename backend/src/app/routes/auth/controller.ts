import type { Request, Response } from "express";
import { email, success, z } from "zod";
import { prisma } from "../../../lib/prisma";
import bcrypt from "bcrypt";
import { sendMail } from "../../../utils/mail";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import { env } from "../../../env";
import type { DataStoredInToken } from "../../../interfaces/dataInsideToken";
import type { RequestWithUser } from "../../../interfaces/requestWithUser";

const signUpSchema = z.object({
    username: z.string().min(3).max(20),
    name: z.string().min(3).max(20),
    email: z.email(),
    password: z.string().min(6),
});

const loginSchema = z.object({
    email: z.email(),
    password: z.string().min(6),
});

class AuthController {
    async signup(req: Request, res: Response) {
        try {
            const { data, success } = signUpSchema.safeParse(req.body);

            if (!success) {
                return res.status(400).json({
                    error: "Invalid input format",
                });
            }

            const { email, name, username, password } = data;

            const user = await prisma.user.findFirst({
                where: { email, username },
            });

            if (user) {
                return res.status(400).json({
                    error: "User with this email or username already exists",
                });
            }

            const hashedPass: string = await bcrypt.hash(password, 10);
            const bucketFolder: string = `/uploads/${username}-${Date.now()}`;

            const newUser = await prisma.user.create({
                data: {
                    email,
                    name,
                    username,
                    password: hashedPass,
                    bucketFolderName: bucketFolder,
                },
            });

            const emailVerificationToken = crypto.randomBytes(32).toString("hex");
            const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

            const verifyEmailUrl = `http://localhost:8080/auth/verify?token=${emailVerificationToken}`;

            await sendMail({
                url: verifyEmailUrl,
                userEmail: "amitroy9546184327@gmail.com",
                userName: newUser.name,
            });

            await prisma.user.update({
                where: { id: newUser.id },
                data: {
                    emailVerificationToken,
                    emailVerificationTokenExpiry: expiresAt,
                },
            });

            return res.status(201).json({
                message: "User created successfully",
                success: true,
                user: {
                    id: newUser.id,
                    email: newUser.email,
                    name: newUser.name,
                    username: newUser.username,
                },
            });
        } catch (error) {
            return res.status(500).json({
                error: "Failed to create user",
                success: false,
            });
        }
    }

    async login(req: Request, res: Response) {
        try {
            const { success, data } = loginSchema.safeParse(req.body);

            if (!success) {
                return res.status(400).json({
                    error: "Invalid input format",
                });
            }

            const { email, password } = data;

            const user = await prisma.user.findUnique({
                where: {
                    email: email,
                },
            });

            if (!user) {
                return res.status(404).json({
                    error: "User not found with this credentials",
                });
            }

            // check is user is verified or not

            if (!user.isVerified) {
                return res.status(400).json({
                    error: "Please verify your email before login",
                });
            }

            // check the password

            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return res.status(400).json({
                    error: "Invalid credentials",
                });
            }

            // generate jwt

            const tokenData: DataStoredInToken = {
                id: user.id,
            };

            const token = jwt.sign(tokenData, env.JWT_SECRET, {
                expiresIn: "1d",
            });

            // set jwt in user cookies
            res.cookie("jwt", token, {
                httpOnly: true,
            });

            return res.status(200).json({
                message: "User loggeIn successfully",
                success: true,
                user: {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    username: user.username,
                },
            });
        } catch (error) {
            return res.status(500).json({
                error: "Failed to loggedIn",
                success: false,
            });
        }
    }

    async getCurrentLogggedInUser(req: Request, res: Response) {
        try {
            const user = (req as RequestWithUser).user;

            if (!user) {
                return res.status(404).json({
                    error: "User not found",
                    success: false,
                });
            }

            return res.status(200).json({
                message: "LoggedIn user fetched successfully",
                success: true,
                user: {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    username: user.username,
                    verified: user.isVerified,
                    bucketFolder: user.bucketFolderName,
                },
            });
        } catch (error) {
            return res.status(500).json({
                error: "Failed to fetch loggedInUser",
                success: false,
            });
        }
    }

    async logout(req: Request, res: Response) {
        try {
            res.clearCookie("jwt", {
                httpOnly: true,
            });

            return res.status(200).json({
                message: "User logged out successfully",
                success: true,
            });
        } catch (error) {
            return res.status(500).json({
                error: "Failed to logout",
                success: false,
            });
        }
    }

    async verifyEmail(req: Request, res: Response) {
        try {
            if (typeof req.query.token !== "string") {
                return res.status(400).json({
                    error: "Invalid token",
                });
            }

            const token = req.query.token;

            if (!token) {
                return res.status(400).json({
                    error: "Invalid token",
                });
            }

            const user = await prisma.user.findFirst({
                where: {
                    emailVerificationToken: token,
                },
            });

            if (
                !user ||
                typeof user !== "object" ||
                !(user.emailVerificationTokenExpiry instanceof Date)
            ) {
                return res.status(400).json({
                    error: "Invalid token",
                });
            }

            // check either token is expired or not

            if (Date.now() > user.emailVerificationTokenExpiry?.getTime()) {
                return res.status(400).json({
                    error: "Token expired, please signup again",
                });
            }

            await prisma.user.update({
                where: {
                    id: user.id,
                },
                data: {
                    isVerified: true,
                    emailVerificationToken: undefined,
                    emailVerificationTokenExpiry: undefined,
                },
            });

            return res.status(200).json({
                message: "Email verified successfully",
                success: true,
            });
        } catch (error) {
            return res.status(500).json({
                error: "Failed to verify email",
                success: false,
            });
        }
    }
}

export default AuthController;
