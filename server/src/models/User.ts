import { Schema, model, Document } from "mongoose";
import bcrypt from "bcrypt";
export interface UserDoc extends Document {
    name: string;
    email: string;
    password: string;
    address: string;
    role: string;
    phone: string;
    country: string;
    state: string;
    bookmarks: [any];
    orders: [any];
    contents: [any];
}

const userSchema = new Schema<UserDoc>({
    name: String,
    email: String,
    password: String,
    address: String,
    role: {
        type: String,
        enum: ["Admin", "Advertiser", "User"],
        default: "Advertiser"
    },
    phone: String,
    country: String,
    state: String,
    bookmarks: [
        {
            type: Schema.Types.ObjectId,
            ref: "Content"
        }
    ],

    orders: [
        {
            type: Schema.Types.ObjectId,
            ref: "Order"
        }
    ],
    contents: [
        {
            type: Schema.Types.ObjectId,
            ref: "Content"
        }
    ]

}, {
    timestamps: true,
    toJSON: {
        transform(doc, ret) {
            delete ret.password;
            delete ret.__v;
        },
    },
});

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    }

    const hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;

    next();
});


export const User = model<UserDoc>("User", userSchema);