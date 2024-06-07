import express, { NextFunction, Request, Response } from "express";
import { deleteImage, ErrorHandler, UploadedFile, uploadImage } from "../utils";
import { contentService, userService } from "../services";
import { isAuthenticated, upload } from "../middlewares";

const router = express.Router();


router.get("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const contents = await contentService.getContents(req.query);
        res.status(200).json(contents)
    } catch (error: any) {
        return next(new ErrorHandler(500, error.message))
    }
});

router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const content = await contentService.getContent(req.params.id);
        res.status(200).json(content)
    } catch (error: any) {
        return next(new ErrorHandler(500, error.message))
    }
})

router.post("/",isAuthenticated, async (req: Request, res: Response, next: NextFunction) => {

    try {
        const user = req.user
        if (!user) {
            return next(new ErrorHandler(404, "Unauthorized please login to add to wishlist"))
        }

        const findUser = await userService.findUserWithId(user.id)
        if (!findUser) {
            return next(new ErrorHandler(404, "User not found"))
        }
        
        const content = await contentService.addContent(req.body);
        findUser.contents.push(content._id)
        await findUser.save();
        res.status(201).json(content)
    } catch (error: any) {
        return next(new ErrorHandler(500, error.message))
    }
})

router.post("/upload/companyLogo", upload.single("companyLogo"), async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = await uploadImage(req.file as UploadedFile)
        res.status(200).json(data)
    } catch (error: any) {
        return next(new ErrorHandler(500, error.message))
    }
})

router.post("/companyLogo/delete", async (req: Request, res: Response, next: NextFunction) => {
    try {
        await deleteImage(req.body.id)
        res.status(200).json({
            message: "Deleted successfully"
        })
    } catch (error: any) {
        return next(new ErrorHandler(500, error.message))
    }
})

router.post("/upload/caseStudy", upload.single("caseStudy"), async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = await uploadImage(req.file as UploadedFile)
        res.status(200).json(data)
    } catch (error: any) {
        return next(new ErrorHandler(500, error.message))
    }
})

export { router as contentRoutes }