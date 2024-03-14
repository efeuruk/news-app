import { useContext } from "react";
import { SearchFilterContext } from "../SearchFilterContext";

export const useSearchFilterContext = () => {
  const context = useContext(SearchFilterContext);

  if (!context) {
    throw new Error(
      "useSearchFilterContext must be used within a SearchFilterProvider"
    );
  }

  return context;
};
