import { Image } from "../types";
import { Cart } from "../models";

class CartService {
    async addToCart(data: any) {
        return await Cart.create(data)
    }

    async getCarts(userId: string) {
        return await Cart.find({ user: userId }).populate({
            path: 'content',
            select: 'companyLogo websiteName websiteURL websiteDescription'
        }).populate({ path: "user", select: "name email country state" });
    }

    async findCartWithId(userId: string, contentId: string) {
        return await Cart.findOne({ user: userId, content: contentId });
    }

    async updateCartUploadDoc(cartId: string, uploadDoc: Image) {
        return await Cart.findByIdAndUpdate(cartId, { uploadDoc }, { new: true });
    }

    async findUserCart(userId: string, cartId: string) {
        return await Cart.findOne({ _id: cartId, user: userId });
    }

    async updateCart(cartId: string, updateData: any) {

        return await Cart.findByIdAndUpdate(cartId, { ...updateData }, { new: true });
    }

    async deleteCartsByUserId(userId: string) {
        return await Cart.deleteMany({ user: userId });
    }
}

export const cartService = new CartService();