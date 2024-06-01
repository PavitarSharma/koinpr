import { AddContentInputs } from "../types";
import { Content } from "../models";

class ContentService {
    async addContent(data: AddContentInputs) {
        return await Content.create(data)
    }

    async getContents() {
        return await Content.find()
    }

    async getContent(id: string) {
        return await Content.findById(id)
    }

    
}

export const contentService = new ContentService();
