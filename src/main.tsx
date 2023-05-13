import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import GlobalStyle from "./styles/GlobalStyles.tsx";
import { ThemeProvider } from "styled-components";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={{ mainColor: "#3B9CFC", subMainColor: "#E2F0FD" }}>
      <GlobalStyle />
    </ThemeProvider>
    <App />
  </React.StrictMode>
);
