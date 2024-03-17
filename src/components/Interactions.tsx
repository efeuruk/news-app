import Searchbar from "./Searchbar";
import DatePicker from "./DatePicker";
import { Grid } from "@mui/material";
import CategoryFilter from "./CategoryFilter";
import SourceFilter from "./SourceFilter";

const InteractionItems = [
  <Searchbar />,
  <DatePicker />,
  <CategoryFilter />,
  <SourceFilter />,
];

const Interactions = () => {
  return (
    <Grid container spacing={2} sx={{ mb: 3 }}>
      {InteractionItems.map((item, index) => (
        <Grid item key={index} xs={12} sm={6} md={3}>
          {item}
        </Grid>
      ))}
    </Grid>
  );
};

export default Interactions;
