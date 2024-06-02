export type Image = {
    id: string;
    url: string
}

export interface OfferingInputs {
    offering: string;
    mediaKitPrice: number;
    discountPrice: number;
    features: string[]
}

export interface AddContentInputs {
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
    offerings: OfferingInputs[];
}


export type AuthPayload = {
    id: string;
    email: string;
    role: string;
}