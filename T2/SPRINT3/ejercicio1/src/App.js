import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Inicio from './components/Inicio.jsx';
import PerfilUsuario from './components/PerfilUsuario.jsx';
import './App.css';

const App = () => {
  return (
    <div>    
    <Router>
      <Routes>
        <Route path="/" element={<Inicio/>} />
        <Route path="/usuario/:id" element={<PerfilUsuario/>} />
      </Routes>
    </Router>
    </div>
  );
};

export default App;
