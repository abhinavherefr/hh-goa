import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import CreateChoice from './pages/CreateChoice';
import SoloBuilder from './pages/SoloBuilder';
import TeamBuilder from './pages/TeamBuilder';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/create" element={<CreateChoice />} />
          <Route path="/create/individual" element={<SoloBuilder />} />
          <Route path="/create/team" element={<TeamBuilder />} />
          <Route path="/hype" element={<Landing />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;