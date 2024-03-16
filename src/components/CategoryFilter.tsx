import {
  Checkbox,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useSearchFilterContext } from "../context/hooks/useSearchFilterContext";

const categories = ["Sports", "Economy", "Politics", "Technology", "Health"];

const CategoryFilter = () => {
  const { categoryFilter, setCategoryFilter } = useSearchFilterContext();

  const handleChange = (event: SelectChangeEvent<typeof categoryFilter>) => {
    const value = event.target.value;
    setCategoryFilter(typeof value === "string" ? value.split(",") : value);
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
        {categories.map(category => (
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