import React from "react";
import ReactDOM from "react-dom/client";
import { AppProvider } from "./providers/AppProvider";
import { AppRouter } from "./router";
import "@/styles/globals.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AppProvider>
      <AppRouter />
    </AppProvider>
  </React.StrictMode>
);

