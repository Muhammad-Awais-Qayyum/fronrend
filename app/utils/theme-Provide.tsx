"use client";
import React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ThemeProviderProps } from "next-themes/dist/types";

// Define a functional component called ThemeProvider which accepts ThemeProviderProps
function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  // Render NextThemesProvider with spread props and children
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}

export default ThemeProvider; // Export the ThemeProvider component
