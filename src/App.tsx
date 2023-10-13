import React from "react";
import Home from "./pages/Home";
import PageNotFound from "./pages/PageNotFound";
import { Routes, Route } from "react-router-dom";

const App: React.FC = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
};

export default App;
