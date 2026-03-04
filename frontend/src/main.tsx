// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import ErrorProvider from "./contexts/error/ErrorProvider";
import ScrollToTop from "./components/ScrollToTop";

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <ErrorProvider>
        <ScrollToTop />
        <App />
      </ErrorProvider>
    </BrowserRouter>
  </QueryClientProvider>,
);
