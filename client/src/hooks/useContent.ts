import { useQuery } from "@tanstack/react-query"
import { axiosInstance } from "../config"


const useContent = (contentId: string) => {
    const content = useQuery({
        queryKey: ['contents', contentId],
        queryFn: async () => {
            const response = await axiosInstance.get(`/contents/${contentId}`)
            return response.data
        },
    })
    return content
}

export default useContent