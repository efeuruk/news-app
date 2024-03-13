import React from "react";
import Searchbar from "./Searchbar";
import { Box } from "@mui/material";

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
      <div>date filter</div>
      <div>category filter</div>
      <div>source filter</div>
    </Box>
  );
};

export default Interactions;
