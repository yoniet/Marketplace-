import React from "react";
import { BrowserRouter } from "react-router-dom";
import MainRouter from "./MainRouter";
import theme from "./theme";
import { ThemeProvider } from "@mui/material";
import { Container } from "@mui/system";
import NewShop from "./components/shop/NewShop.jsx";
import Shops from "./components/shop/Shops.jsx";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <MainRouter />
        <NewShop />
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
