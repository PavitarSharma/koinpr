import { User, UserDoc } from "../models";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AuthPayload } from "../types";

class UserService {
    async findUserWithEmail(email: string): Promise<UserDoc | null> {
        return await User.findOne({ email });
    }

    async findUserWithId(id: string): Promise<UserDoc | null> {
        return await User.findById(id)
    }

    async findUser(id: string): Promise<UserDoc | null> {
        return await User.findById(id).populate("contents")
    }

    async createUser(data: any): Promise<UserDoc> {
        return await User.create(data);
    }

    async comparePassword(password: string, hash: string): Promise<boolean> {
        return await bcrypt.compare(password, hash)
    }

    generateSignature(payload: AuthPayload): any {
        const access_token = jwt.sign(payload, process.env.JWT_ACCESS_SECRET as string, {
            expiresIn: process.env.JWT_ACCESS_TIME
        })



        return {
            access_token,

        }
    }


}

export const userService = new UserService();