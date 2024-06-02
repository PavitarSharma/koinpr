export type Image = {
    id: string;
    url: string
}

export interface IUser {
    _id: string;
    name: string;
    email: string;
    address: string;
    role: string;
    phone: string;
    country: string;
    state: string;
    bookmarks: [unknown]
}

export interface IOffering {
    _id: string;
    offering: string;
    mediaKitPrice: number;
    discountPrice: number;
    features: string[]
}

export interface IContent {
    _id: string;
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
    offerings: IOffering[];
    createAt: Date;
    updateAt: Date;
    visited: number;
}

export interface ICart {
    _id: string;
    user: IUser;
    contentOffering: IOffering,
    content: IContent,
    quantity: number;
    uploadDoc: Image;
    getWritten: boolean;
    createAt: Date;
    updateAt: Date;
}

