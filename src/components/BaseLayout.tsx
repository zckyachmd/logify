import React from "react";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Footer } from "@/components/Footer";

const BaseLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col">
        <div className="flex-grow max-w-7xl w-full p-4 mx-auto">{children}</div>
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default BaseLayout;
