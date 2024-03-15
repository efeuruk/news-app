import React from "react";
import Searchbar from "./Searchbar";
import { Box } from "@mui/material";
import DatePicker from "./DatePicker";

const Interactions = () => {
  return (
    <Box
      sx={{
        mb: 3,
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Searchbar />
      <DatePicker />
      <div>category filter</div>
      <div>source filter</div>
    </Box>
  );
};

export default Interactions;
