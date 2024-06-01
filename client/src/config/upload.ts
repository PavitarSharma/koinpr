import { axiosInstance } from "./axiosInstance"

export const uploadCompanyLogo = async (formData: FormData) => {
    const response = await axiosInstance.post("/contents/upload/companyLogo", formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    })

    return response.data
}

export const uploadCaseStudy = async (formData: FormData) => {
    const response = await axiosInstance.post("/contents/upload/caseStudy", formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    })

    return response.data
}