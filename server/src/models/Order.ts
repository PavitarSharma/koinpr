import { Schema, model, Document } from "mongoose";

export interface OrderDoc extends Document {
    cart: Schema.Types.ObjectId[];
    paymentMethod: string;
    totalPrice: number;
    status: string;
    billingInformation: {
        firstName: string;
        lastName: string;
        email: string;
        telegramId: string;
        country: string;
        state: string;
    };
}

const orderSchema = new Schema<OrderDoc>({
    cart: [{ type: Schema.Types.ObjectId, ref: "Cart" }],
    paymentMethod: String,
    totalPrice: Number,
    status: {
        type: String,
        enum: ["pending", "paid", "shipped", "delivered"],
        default: "pending"
    },
    billingInformation: {
        firstName: String,
        lastName: String,
        email: String,
        telegramId: String,
        country: String,
        state: String
    }
}, {
    timestamps: true
});

export const Order = model<OrderDoc>("Order", orderSchema);
