"use client";

import * as React from "react";

type Theme = "light" | "dark";

type ThemeContextValue = {
  resolvedTheme: Theme;
  setTheme: (theme: Theme) => void;
  mounted: boolean;
};

const ThemeContext = React.createContext<ThemeContextValue | null>(null);

function getSystemTheme(): Theme {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function getStoredTheme(): Theme | null {
  const storedTheme = window.localStorage.getItem("theme");
  return storedTheme === "dark" || storedTheme === "light" ? storedTheme : null;
}

function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle("dark", theme === "dark");
  document.documentElement.style.colorScheme = theme;
}

function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = React.useState(false);
  const [resolvedTheme, setResolvedTheme] = React.useState<Theme>("dark");

  const setTheme = React.useCallback((theme: Theme) => {
    window.localStorage.setItem("theme", theme);
    applyTheme(theme);
    setResolvedTheme(theme);
  }, []);

  React.useEffect(() => {
    const initialTheme = getStoredTheme() ?? getSystemTheme();
    applyTheme(initialTheme);

    const timeoutId = window.setTimeout(() => {
      setResolvedTheme(initialTheme);
      setMounted(true);
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, []);

  return (
    <ThemeContext.Provider value={{ resolvedTheme, setTheme, mounted }}>
      <ThemeHotkey />
      {children}
    </ThemeContext.Provider>
  );
}

function useTheme() {
  const context = React.useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }

  return context;
}

function ThemeHotkey() {
  const { resolvedTheme, setTheme } = useTheme();

  React.useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (
        event.defaultPrevented ||
        event.repeat ||
        event.metaKey ||
        event.ctrlKey ||
        event.altKey
      )
        return;
      if (event.key.toLowerCase() !== "d") return;
      if (
        event.target instanceof HTMLElement &&
        (event.target.isContentEditable ||
          ["INPUT", "TEXTAREA", "SELECT"].includes(event.target.tagName))
      )
        return;

      setTheme(resolvedTheme === "dark" ? "light" : "dark");
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [resolvedTheme, setTheme]);

  return null;
}

export { ThemeProvider };
export { useTheme };
