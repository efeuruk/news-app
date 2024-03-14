import "./App.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { SearchFilterProvider } from "./context/SearchFilterContext";
import Content from "./components/Content";

function App() {
  const theme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <SearchFilterProvider>
        <Content />
      </SearchFilterProvider>
    </ThemeProvider>
  );
}

export default App;
