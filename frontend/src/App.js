import React, { useState } from 'react';
import axios from 'axios';
import { Bus, User, Lock, ArrowRight } from 'lucide-react';
import './App.css';

function App() {
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [mensaje, setMensaje] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Importante: Usamos la URL de tu API en AWS
      const response = await axios.post('https://api.schoolwaysv.online/api/login', { correo, password });
      setMensaje(`¡Bienvenido, ${response.data.nombre_completo}!`);
    } catch (error) {
      setMensaje('Error: Credenciales incorrectas');
    }
  };

  return (
    <div className="login-container">
      {/* Lado Izquierdo: Azul con Logo */}
      <div className="login-sidebar">
        <div className="sidebar-content">
          <Bus size={80} color="white" />
          <h1>SchoolWaySV</h1>
          <p>Gestión eficiente de transporte escolar.</p>
        </div>
      </div>

      {/* Lado Derecho: Formulario Blanco */}
      <div className="login-form-section">
        <form onSubmit={handleLogin} className="login-box">
          <h2>Iniciar Sesión</h2>
          <div className="input-group">
            <User size={20} />
            <input type="email" placeholder="Correo electrónico" value={correo} onChange={(e) => setCorreo(e.target.value)} required />
          </div>
          <div className="input-group">
            <Lock size={20} />
            <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} required />
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

export default App;