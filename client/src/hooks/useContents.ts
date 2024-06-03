import { useQuery } from '@tanstack/react-query'
import { axiosInstance } from '../config'
import { useFilterContext } from './useGlobalState'
import useDebounce from './useDebounce'
import { generateQueryParams } from '../utils'

const useContents = () => {
    const { categoriesFilter, searchTerm, productTypeFilter, regionsFilter, languagesFilter, budget, page, limit } = useFilterContext()
    const debouncedSearch = useDebounce(searchTerm);

    const filters = {
        categories: categoriesFilter,
        q: debouncedSearch,
        productTypes: productTypeFilter,
        regions: regionsFilter,
        languages: languagesFilter,
        budget,
        page,
        limit,
    };

    const queryParams = generateQueryParams(filters);

    const contents = useQuery({
        queryKey: ['contents', filters],
        queryFn: async () => {
            const response = await axiosInstance.get(`/contents?${queryParams}`)
            return response.data
        },
    })
    return contents
}

export default useContents