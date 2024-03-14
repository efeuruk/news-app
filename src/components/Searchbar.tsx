import { TextField } from "@mui/material";
import { useSearchFilterContext } from "../context/hooks/useSearchFilterContext";
import { useDebouncedCallback } from "use-debounce";

const Searchbar = () => {
  const { setSearch, setArticlesLoading } = useSearchFilterContext();

  const handleSearch = useDebouncedCallback((q: string) => {
    setArticlesLoading(true);
    setSearch(q);
  }, 500);

  return (
    <TextField
      label="Search Articles"
      variant="outlined"
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
        handleSearch(e.target.value);
      }}
    />
  );
};

export default Searchbar;
