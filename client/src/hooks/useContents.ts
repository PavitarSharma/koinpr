import { useQuery } from '@tanstack/react-query'
import { axiosInstance } from '../config'

const useContents = () => {
    const contents = useQuery({
        queryKey: ['contents'],
        queryFn: async () => {
            const response = await axiosInstance.get("/contents")
            return response.data
        },
    })
    return contents
}

export default useContents