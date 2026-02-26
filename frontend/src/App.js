import React, { useState } from 'react';
import axios from 'axios';
import { Bus, User, Lock, ArrowRight } from 'lucide-react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import DashboardAdmin from './DashboardAdmin';
import DashboardUser from './DashboardUser';
import './App.css';
 
function Login() {
 
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [mensaje, setMensaje] = useState('');
  const navigate = useNavigate();
 
  const handleLogin = async (e) => {
    e.preventDefault();
 
    try {
      const response = await axios.post(
        'http://localhost:5000/api/login',
        { correo, password }
      );
 
      const user = response.data;
 
      if (user.Rol === "Admin") {
        navigate('/admin', { state: { user } });
      } else {
        navigate('/user', { state: { user } });
      }
 
    } catch (error) {
      setMensaje('Error: Credenciales incorrectas');
    }
  };
 
  return (
<div className="login-container">
<div className="login-sidebar">
<div className="sidebar-content">
<Bus size={80} color="white" />
<h1>SchoolWaySV</h1>
<p>Gestión eficiente de transporte escolar.</p>
</div>
</div>
 
      <div className="login-form-section">
<form onSubmit={handleLogin} className="login-box">
<h2>Iniciar Sesión</h2>
 
          <div className="input-group">
<User size={20} />
<input
              type="email"
              placeholder="Correo electrónico"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              required
            />
</div>
 
          <div className="input-group">
<Lock size={20} />
<input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
</div>
 
          <button type="submit" className="login-btn">
            Entrar <ArrowRight size={20} />
</button>
 
          {mensaje && <p className="status-msg">{mensaje}</p>}
</form>
</div>
</div>
  );
}
 
function App() {
  return (
<Routes>
<Route path="/" element={<Login />} />
<Route path="/admin" element={<DashboardAdmin />} />
<Route path="/user" element={<DashboardUser />} />
</Routes>
  );
}
 
export default App;