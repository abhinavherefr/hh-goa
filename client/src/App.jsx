import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/create" element={<Landing />} />
          <Route path="/create/individual" element={<Landing />} />
          <Route path="/create/team" element={<Landing />} />
          <Route path="/hype" element={<Landing />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;