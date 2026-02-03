import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "@/pages/Home";
import Privacy from "@/pages/Privacy";
import About from "@/pages/About";
import Terms from "@/pages/Terms";
import Documentation from "@/pages/Documentation";
import PricingPage from "@/pages/PricingPage";
import Demo from "@/pages/Demo"; 
import DemoResult from "@/pages/DemoResult"; 
import Layout from "@/layouts/Layout";
import { Toaster } from "@/components/ui/toaster";

function App() {
  return (
    <>
      <Routes>
        {/* Layout global */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/documentation" element={<Documentation />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/about" element={<About />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/demo" element={<Demo />} />
          <Route path="/demo/result" element={<DemoResult />} />
        </Route>
      </Routes>

      <Toaster />
    </>
  );
}

export default App;
