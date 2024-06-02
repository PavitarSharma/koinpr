import express, { NextFunction, Request, Response } from "express";
import { isAuthenticated } from "../middlewares";
import { ErrorHandler } from "../utils";
import { cartService, orderService, userService } from "../services";

const router = express.Router();

router.post("/create", isAuthenticated, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = req.user
        if (!user) {
            return next(new ErrorHandler(404, "Unauthorized please login to add to wishlist"))
        }

        const findUser = await userService.findUserWithId(user.id)
        if (!findUser) {
            return next(new ErrorHandler(404, "User not found"))
        }

        const { totalPrice, billingInformation, cart, paymentMethod } = req.body

        const orderData = {
            totalPrice,
            billingInformation,
            cart,
            paymentMethod
        };

        const createdOrder = await orderService.createOrder(orderData);

        findUser.orders.push(createdOrder._id);
        await findUser.save();
        await cartService.deleteCartsByUserId(findUser._id as string);

        res.status(201).json(createdOrder)
    } catch (error: any) {
        return next(new ErrorHandler(500, error.message))
    }
})

export { router as orderRoutes }