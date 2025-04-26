import React, { createContext, useContext, useState, ReactNode } from "react";

type Theme = "green" | "black";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>("green");
  // const [theme, setTheme] = useState<Theme>("black");

  const toggleTheme = () => {
    setTheme((prev) => (prev === "green" ? "black" : "green"));
  };

  const themeClasses =
    theme === "black"
      ? "bg-green-100 text-green-900"
      : "bg-black text-white";

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={`${themeClasses} min-h-screen `}>{children}</div>
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
