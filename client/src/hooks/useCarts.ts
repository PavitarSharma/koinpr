import { useQuery } from "@tanstack/react-query"
import { axiosInstance } from "../config"


const useCarts = () => {
    const carts = useQuery({
        queryKey: ['carts'],
        queryFn: async () => {
            const response = await axiosInstance.get(`/carts`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("todayqToken")}`,
                },
                withCredentials: true,
            })
            return response.data
        },
    })
    return carts
}

export default useCarts