import dayjs from "dayjs";
import { createContext, useState } from "react";

type SearchFilterContextType = {
  search: string;
  setSearch: (search: string) => void;
  dateFilter: string;
  setDateFilter: (dateFilter: string) => void;
  categoryFilter: string[];
  setCategoryFilter: (categoryFilter: string[]) => void;
  sourceFilter: string;
  setSourceFilter: (setCategoryFilter: string) => void;
  isArticlesLoading: boolean;
  setArticlesLoading: (isArticlesLoading: boolean) => void;
};

export const SearchFilterContext = createContext<SearchFilterContextType>(
  null!
);

export const SearchFilterProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [search, setSearch] = useState("");
  const [dateFilter, setDateFilter] = useState(
    dayjs(new Date()).format("YYYY-MM-DD")
  );
  const [categoryFilter, setCategoryFilter] = useState<string[]>([]);
  const [sourceFilter, setSourceFilter] = useState("");
  const [isArticlesLoading, setArticlesLoading] = useState(false);

  const contextValue = {
    search,
    setSearch,
    dateFilter,
    setDateFilter,
    categoryFilter,
    setCategoryFilter,
    sourceFilter,
    setSourceFilter,
    isArticlesLoading,
    setArticlesLoading,
  };

  return (
    <SearchFilterContext.Provider value={contextValue}>
      {children}
    </SearchFilterContext.Provider>
  );
};
