import { Schema, Document, model } from "mongoose";
import { Image } from "../types";

export interface OfferingDoc extends Document {
    offering: string;
    mediaKitPrice: number;
    discountPrice: number;
    features: string[]
}
export interface ContectDoc extends Document {
    category: string;
    websiteName: string;
    websiteUrl: string;
    websiteDescription: string;
    officialEmail: string;
    telegramId: string;
    contentLanguages: string[];
    adultContent: string;
    gambling: string;
    crypto: string;
    regions: string[];
    caseStudy: Image;
    companyLogo: Image;
    offerings: OfferingDoc[];
    visited: number;
    user: Schema.Types.ObjectId;
}

const offeringSchema = new Schema<OfferingDoc>({
    offering: { type: String, required: true },
    mediaKitPrice: { type: Number, required: true },
    discountPrice: { type: Number, required: true },
    features: { type: [String], required: true },
});


const contentSchema = new Schema<ContectDoc>({
    category: { type: String, required: true },
    websiteName: { type: String, required: true },
    websiteUrl: { type: String, required: true },
    websiteDescription: { type: String, required: true },
    officialEmail: { type: String, required: true },
    telegramId: { type: String, required: true },
    contentLanguages: { type: [String], required: true },
    adultContent: { type: String, required: true },
    gambling: { type: String, required: true },
    crypto: { type: String, required: true },
    regions: { type: [String], required: true },
    caseStudy: {
        id: String,
        url: String
    },
    companyLogo: {
        id: String,
        url: String
    },
    offerings: { type: [offeringSchema], required: true },
    visited: { type: Number, default: 0 },
    user: { type: Schema.Types.ObjectId, ref: "User" },
}, {
    timestamps: true
})

export const Content = model<ContectDoc>("Content", contentSchema);

