import { createContext, ReactNode, useState } from "react";

export interface FilterContextType {
  categoriesFilter: string[];
  setCategoriesFilter: React.Dispatch<React.SetStateAction<string[]>>;
  regionsFilter: string[];
  setRegionsFilter: React.Dispatch<React.SetStateAction<string[]>>;
  languagesFilter: string[];
  setLanguagesFilter: React.Dispatch<React.SetStateAction<string[]>>;
  productTypeFilter: string[];
  setProductTypeFilter: React.Dispatch<React.SetStateAction<string[]>>;
  budget: string;
  setBudget: React.Dispatch<React.SetStateAction<string>>;
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  limit: number;
  setLimit: React.Dispatch<React.SetStateAction<number>>;
}

export const FilterContext = createContext<FilterContextType | null>(null);

export const FilterContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [categoriesFilter, setCategoriesFilter] = useState<string[]>([]);
  const [regionsFilter, setRegionsFilter] = useState<string[]>([]);
  const [languagesFilter, setLanguagesFilter] = useState<string[]>([]);
  const [productTypeFilter, setProductTypeFilter] = useState<string[]>([]);
  const [budget, setBudget] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(6)

  const value = {
    categoriesFilter,
    setCategoriesFilter,
    regionsFilter,
    setRegionsFilter,
    languagesFilter,
    setLanguagesFilter,
    productTypeFilter,
    setProductTypeFilter,
    budget,
    setBudget,
    searchTerm,
    setSearchTerm,
    page,
    setPage,
    limit,
    setLimit,
  };
  return (
    <FilterContext.Provider value={value}>{children}</FilterContext.Provider>
  );
};
