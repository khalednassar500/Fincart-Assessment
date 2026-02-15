import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "./theme/theme.ts";
import { QuoteProvider } from "./context/QuoteContext.tsx";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <QuoteProvider>
        <App />
      </QuoteProvider>
    </ThemeProvider>
  </StrictMode>
);
