import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App.tsx";
import AppProvider from "./hooks/index.tsx";

import "./index.scss";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </React.StrictMode>
);
