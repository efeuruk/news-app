import {
  Checkbox,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useSearchFilterContext } from "../context/hooks/useSearchFilterContext";
import { CATEGORIES } from "../constants";

const CategoryFilter = () => {
  const { categoryFilter, setCategoryFilter, setArticlesLoading } =
    useSearchFilterContext();

  const handleChange = (event: SelectChangeEvent<typeof categoryFilter>) => {
    const value = event.target.value;
    setCategoryFilter(typeof value === "string" ? value.split(",") : value);
    setArticlesLoading(true);
  };

  return (
    <FormControl fullWidth>
      <InputLabel>Category</InputLabel>
      <Select
        multiple
        value={categoryFilter}
        label="Category"
        onChange={handleChange}
        renderValue={selected => selected.join(", ")}
      >
        {CATEGORIES.map(category => (
          <MenuItem value={category} key={category}>
            <Checkbox checked={categoryFilter.indexOf(category) > -1} />
            {category}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CategoryFilter;
