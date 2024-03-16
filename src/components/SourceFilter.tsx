import {
  Checkbox,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useSearchFilterContext } from "../context/hooks/useSearchFilterContext";
import { SOURCES } from "../constants";

const sources = SOURCES;

const SourceFilter = () => {
  const { sourceFilter, setSourceFilter, setArticlesLoading } =
    useSearchFilterContext();

  const handleChange = (event: SelectChangeEvent<typeof sourceFilter>) => {
    const value = event.target.value;
    setSourceFilter(typeof value === "string" ? value.split(",") : value);
    setArticlesLoading(true);
  };

  return (
    <FormControl fullWidth>
      <InputLabel>Source</InputLabel>
      <Select
        multiple
        value={sourceFilter}
        label="Source"
        onChange={handleChange}
        renderValue={selected => selected.join(", ")}
      >
        {sources.map(source => (
          <MenuItem value={source} key={source}>
            <Checkbox checked={sourceFilter.indexOf(source) > -1} />
            {source}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SourceFilter;
