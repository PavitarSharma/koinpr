import { AddContentInputs, Filters } from "../types";
import { Content } from "../models";

interface Query {
    category?: { $in: string[] };
    gambling?: string;
    regions?: { $in: string[] };
    contentLanguages?: { $in: string[] };
    adultContent?: string;
    crypto?: string;
    budget?: { $gte: number; $lte: number };
    websiteName?: string | { $regex: RegExp };
}

class ContentService {
    async addContent(data: AddContentInputs) {
        return await Content.create(data)
    }

    async getContents(filters: Filters) {
        const page = Number(filters.page) || 1
        const limit = Number(filters.limit) || 6
        const skip = (page - 1) * limit

        let query: Query = {};

        if (filters.q) {
            const regexPattern = new RegExp(filters.q, 'i');
            query.websiteName = { $regex: regexPattern };
        }

        if (filters.categories && filters.categories.length > 0) {
            query['category'] = { $in: filters.categories };
        }
        if (filters.productTypes && filters.productTypes.length > 0) {
            if (filters.productTypes.includes("Gambling")) {
                query.gambling = "Yes";
            }
            if (filters.productTypes.includes("Web 3.0")) {
                query.crypto = "Yes";
            }
            if (filters.productTypes.includes("Adult")) {
                query.adultContent = "Yes";
            }
        }
        if (filters.regions && filters.regions.length > 0) {
            query['regions'] = { $in: filters.regions };
        }
        if (filters.languages && filters.languages.length > 0) {
            query['contentLanguages'] = { $in: filters.languages };
        }


        if (filters.budget) {
            const [min, max] = filters.budget.split("-").map((value) => parseInt(value.replace("₹", "").trim()));
            if (!isNaN(min) && !isNaN(max)) {
                const offeringsQuery = { "offerings.mediaKitPrice": { $gte: min, $lte: max } };
                query = { ...query, ...offeringsQuery };
            } else if (filters.budget === "Above 1000") {
                const offeringsQuery = { "offerings.mediaKitPrice": { $gte: 1001 } };
                query = { ...query, ...offeringsQuery };
            }
        }

        const contents = await Content.find(query)

        const allOfferings = contents.flatMap(content => 
            content.offerings.map(offering => ({
                ...offering,
                websiteName: content.websiteName,
                companyLogo: content.companyLogo,
                regions: content.regions,
                visited: content.visited,
                contentLanguages: content.contentLanguages,
                contentId: content._id
            }))
        );
        
        const totalOfferingsCount = contents.reduce((total, content) => {
            // Count the number of offerings for each Content object
            const offeringsCount = content.offerings.length;
            // Add the count of offerings for this Content object to the total count
            return total + offeringsCount;
        }, 0);
        
        return {
            data:contents,
            totals: totalOfferingsCount
        }
    }

    async getContent(id: string) {
        return await Content.findById(id)
    }


}

export const contentService = new ContentService();
