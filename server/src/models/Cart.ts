import { Schema, model, Document } from "mongoose";
import { Image } from "types";

export interface CartDoc extends Document {
    user: Schema.Types.ObjectId;
    content: Schema.Types.ObjectId;
    uploadDoc: Image;
    getWritten: boolean;
    quantity: number;
    contentOffering: Object
}

const cartSchema = new Schema<CartDoc>({
    user: { type: Schema.Types.ObjectId, ref: "User" },
    content: { type: Schema.Types.ObjectId, ref: "Content" },
    uploadDoc: {
        id: String,
        url: String
    },
    getWritten: { type: Boolean, default: false },
    quantity: { type: Number, default: 1 },
    contentOffering: Object
}, {
    timestamps: true
});

export const Cart = model<CartDoc>("Cart", cartSchema);