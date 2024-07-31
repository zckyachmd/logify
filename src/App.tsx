import { ThemeProvider } from "@/components/ThemeProvider";
import { Home } from "@/pages/Home";
import { Footer } from "@/components/Footer";

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col">
        <div className="flex-grow max-w-7xl w-full p-4 mx-auto">
          <Home />
        </div>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
