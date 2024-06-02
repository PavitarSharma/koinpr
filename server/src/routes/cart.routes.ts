import express, { NextFunction, Request, Response } from "express";
import { deleteImage, ErrorHandler, UploadedFile, uploadImage } from "../utils";
import { isAuthenticated, upload } from "../middlewares";
import { cartService, contentService, userService } from "../services";

const router = express.Router();

router.get("/", isAuthenticated, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = req.user
        if (!user) {
            return res.status(200).json([])
        }

        const findUser = await userService.findUserWithId(user.id)
        if (!findUser) {
            return next(new ErrorHandler(404, "User not found"))
        }

        const carts = await cartService.getCarts(findUser._id as string);
        
        res.status(200).json(carts)
    } catch (error: any) {
        return next(new ErrorHandler(500, error.message))
    }
})

router.post("/add", isAuthenticated, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = req.user
        if (!user) {
            return next(new ErrorHandler(404, "Unauthorized please login to add to wishlist"))
        }

        const findUser = await userService.findUserWithId(user.id)
        if (!findUser) {
            return next(new ErrorHandler(404, "User not found"))
        }

        const { contentId, offeringId } = req.body

        const content = await contentService.getContent(contentId);
        if (!content) {
            return next(new ErrorHandler(404, "Content not found"))
        }

        const existingCartItem = await cartService.findCartWithId(findUser._id as string, contentId)
        if (existingCartItem) {
            return next(new ErrorHandler(404, "Product already in cart"))
        }

        const contentOffering = content.offerings.find((offering: any) => offering._id.toString() === offeringId)
        

        const cartData = {
            user: findUser._id,
            content: contentId,
            contentOffering
        }

        const cart = await cartService.addToCart(cartData);
        res.status(200).json(cart)
    } catch (error: any) {
        return next(new ErrorHandler(500, error.message))
    }
})

router.post("/uploadDoc",isAuthenticated, upload.single("uploadDoc"), async(req: Request, res: Response, next: NextFunction) => {
    try {
        const user = req.user
        if (!user) {
            return next(new ErrorHandler(404, "Unauthorized please login to add to wishlist"))
        }

        const findUser = await userService.findUserWithId(user.id)
        if (!findUser) {
            return next(new ErrorHandler(404, "User not found"))
        }

        const { cartId, uploadDocId} = req.body;

    
        if (!cartId) {
            return next(new ErrorHandler(400, "Cart ID is required"));
        }
        

        // if(uploadDocId) {
        //     await deleteImage(uploadDocId)
        // }

        const data = await uploadImage(req.file as UploadedFile)

        const updatedCart = await cartService.updateCartUploadDoc(cartId, {
            id: data.id,
            url: data.url
        });
        
        res.status(200).json(updatedCart)
    } catch (error: any) {
        return next(new ErrorHandler(500, error.message))
    }
});

router.post("/uploadDoc/delete",isAuthenticated, async(req: Request, res: Response, next: NextFunction) => {
    try {
        const user = req.user
        if (!user) {
            return next(new ErrorHandler(404, "Unauthorized please login to add to wishlist"))
        }

        const findUser = await userService.findUserWithId(user.id)
        if (!findUser) {
            return next(new ErrorHandler(404, "User not found"))
        }

        const { cartId, uploadDocId} = req.body;

    
        if (!cartId) {
            return next(new ErrorHandler(400, "Cart ID is required"));
        }
        

        await deleteImage(uploadDocId)


        const updatedCart = await cartService.updateCartUploadDoc(cartId, {
            id: "",
            url: ""
        });
        
        res.status(200).json(updatedCart)
    } catch (error: any) {
        return next(new ErrorHandler(500, error.message))
    }
});

router.patch("/:id", isAuthenticated, async(req: Request, res: Response, next: NextFunction) => {
    try {
        const user = req.user
        if (!user) {
            return next(new ErrorHandler(404, "Unauthorized please login to add to wishlist"))
        }

        const findUser = await userService.findUserWithId(user.id)
        if (!findUser) {
            return next(new ErrorHandler(404, "User not found"))
        }
        const { id } = req.params;
        const findCart = await cartService.findUserCart(findUser._id as string, id)
        if(!findCart) {
            return next(new ErrorHandler(404, "Cart not found"))
        }
        const updatedCart = await cartService.updateCart(id, req.body);
        res.status(200).json(updatedCart)

    } catch (error: any) {
        return next(new ErrorHandler(500, error.message))
    }
})


export { router as cartRoutes }