import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Cobra from './pages/Cobra';

function App() {
  return (
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/Cobra/:companyId" element={<Cobra />} />
          <Route path="/Cobra" element={<Cobra />} />
        </Routes>
     
  );
}

export default App;
