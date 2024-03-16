import Searchbar from "./Searchbar";
import DatePicker from "./DatePicker";
import { Grid } from "@mui/material";
import CategoryFilter from "./CategoryFilter";
import SourceFilter from "./SourceFilter";

const Interactions = () => {
  return (
    <Grid container spacing={2} sx={{ mb: 3 }}>
      <Grid item xs={12} sm={6} md={3}>
        <Searchbar />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <DatePicker />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <CategoryFilter />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <SourceFilter />
      </Grid>
    </Grid>
  );
};

export default Interactions;
