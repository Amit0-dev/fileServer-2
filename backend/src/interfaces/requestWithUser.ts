import type { Request } from "express";
import type { User } from "./user";

export interface RequestWithUser extends Request {
    user?: User;
}
