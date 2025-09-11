"use client";

import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#5E35B1",
    },
    secondary: {
      main: "#9E9E9E",
    },
    error: {
      main: "#D32F2F",
    },
    background: {
      default: "#ffffff",
    },
    text: {
      primary: "#333333",
      secondary: "#666666",
    },
  },
  typography: {
    fontFamily: "var(--font-roboto)",
  },
});
