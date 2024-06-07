import express, { NextFunction, Request, Response } from "express";
import { ErrorHandler } from "../utils";
import { userService } from "../services";
import { isAuthenticated } from "../middlewares";

const router = express.Router();

router.get("/contents", isAuthenticated, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = req.user
        if (!user) {
            return res.status(200).json([])
        }
        const findUser = await userService.findUser(user.id)
        if (!findUser) {
            return next(new ErrorHandler(404, "User not found"))
        }

        res.status(200).json(findUser.contents)

    } catch (error: any) {
        return next(new ErrorHandler(500, error.message))
    }
})

router.post("/signup", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email } = req.body
        const findUser = await userService.findUserWithEmail(email);
        if (findUser) {
            return next(new ErrorHandler(400, "User already exists"))
        }

        const user = await userService.createUser(req.body)
        res.status(201).json(user)
    } catch (error: any) {
        return next(new ErrorHandler(500, error.message))
    }
})

router.post("/login", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body
        const user = await userService.findUserWithEmail(email);
        if (!user) {
            return next(new ErrorHandler(404, "User not found"))
        }

        const isMatch = await userService.comparePassword(password, user.password);
        if (!isMatch) {
            return next(new ErrorHandler(400, "Invalid password"))
        }

        const { access_token } = await userService.generateSignature({
            id: user.id,
            email: user.email,
            role: user.role
        });
        res.status(200).json({ access_token, user })
    } catch (error: any) {
        return next(new ErrorHandler(500, error.message))
    }

    
})

export { router as userRoutes }