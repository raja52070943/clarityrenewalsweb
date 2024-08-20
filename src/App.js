import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './dashboard/Dashboard';
import Cobra from './cobra/Cobra';

function App() {
  return (
   
        <Routes>
          <Route path="/" element={<Dashboard />} />
          
          <Route path="/Cobra/:cobraId" element={<Cobra />} />
          
        </Routes>
     
  );
}

export default App;
