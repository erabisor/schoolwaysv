import './App.css';
import React, { useState } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import Login from './components/Login';
import DashboardAdmin from './components/DashboardAdmin';
import Usuarios from './components/Usuarios';
import Rutas from './components/Rutas';

function App() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    navigate('/');
  };

  return (
    <Routes>

      <Route path="/" element={<Login setUser={(u) => { setUser(u); navigate('/admin/dashboard'); }} />} />


      <Route path="/admin/dashboard" element={user ? <DashboardAdmin user={user} onLogout={handleLogout} /> : <Navigate to="/" />} />
      <Route path="/admin/usuarios" element={user ? <Usuarios user={user} onLogout={handleLogout} /> : <Navigate to="/" />} />
      <Route path="/admin/rutas" element={user ? <Rutas user={user} onLogout={handleLogout} /> : <Navigate to="/" />} />
      

      <Route path="/admin/conductores" element={user ? <Usuarios user={user} onLogout={handleLogout} /> : <Navigate to="/" />} />
      <Route path="/admin/alumnos" element={user ? <Usuarios user={user} onLogout={handleLogout} /> : <Navigate to="/" />} />
    </Routes>
  );
}

export default App;

