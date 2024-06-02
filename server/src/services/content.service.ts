import { AddContentInputs } from "../types";
import { Content } from "../models";

class ContentService {
    async addContent(data: AddContentInputs) {
        return await Content.create(data)
    }

    async getContents() {
        const contents = await Content.find()
        return {
            data: contents
        }
    }

    async getContent(id: string) {
        return await Content.findById(id)
    }

    
}

export const contentService = new ContentService();
