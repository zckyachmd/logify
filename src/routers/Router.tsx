import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BaseLayout from "@/components/BaseLayout";
import { Home } from "@/pages/Home";

const AppRouter: React.FC = () => {
  return (
    <Router>
      <BaseLayout>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BaseLayout>
    </Router>
  );
};

export default AppRouter;
