import { createContext, useState } from "react";

type SearchFilterContextType = {
  search: string;
  setSearch: (search: string) => void;
  date: string;
  setDate: (date: string) => void;
  category: string;
  setCategory: (category: string) => void;
  source: string;
  setSource: (source: string) => void;
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
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");
  const [source, setSource] = useState("");
  const [isArticlesLoading, setArticlesLoading] = useState(false);

  const contextValue = {
    search,
    setSearch,
    date,
    setDate,
    category,
    setCategory,
    source,
    setSource,
    isArticlesLoading,
    setArticlesLoading,
  };

  return (
    <SearchFilterContext.Provider value={contextValue}>
      {children}
    </SearchFilterContext.Provider>
  );
};
