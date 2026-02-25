import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bus, User, Lock, ArrowRight, Loader2, LogOut, Users } from 'lucide-react';
import './App.css';

function App() {
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [cargando, setCargando] = useState(false);
  const [user, setUser] = useState(null);
  const [listaUsuarios, setListaUsuarios] = useState([]);

  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  const handleLogin = async (e) => {
    e.preventDefault();
    setMensaje('');
    setCargando(true);
    
    try {
      const res = await axios.post(`${API_URL}/api/login`, { correo, password });
      setUser(res.data);
    } catch (err) {
      setMensaje('❌ Credenciales incorrectas');
      // Limpieza de campos tras error
      setCorreo(''); 
      setPassword('');
      setTimeout(() => setMensaje(''), 3000);
    } finally { 
      setCargando(false); 
    }
  };

  useEffect(() => {
    if (user && user.rol === 'Admin') {
      axios.get(`${API_URL}/api/usuarios`).then(res => setListaUsuarios(res.data));
    }
  }, [user, API_URL]);

  if (!user) {
    return (
      <div className="login-container">
        <div className="login-sidebar">
          <div className="sidebar-content">
            <Bus size={100} strokeWidth={1.5} />
            <h1>SchoolWaySV</h1>
            <p>Gestión de Transporte Estudiantil</p>
          </div>
        </div>
        <div className="login-form-section">
          <form onSubmit={handleLogin} className="login-box">
            <h2>Iniciar Sesión</h2>
            <div className="input-group">
              <User size={20} color="#64748b" />
              <input 
                type="email" 
                placeholder="Correo electrónico" 
                value={correo} 
                onChange={(e) => setCorreo(e.target.value)} 
                required 
              />
            </div>
            <div className="input-group">
              <Lock size={20} color="#64748b" />
              <input 
                type="password" 
                placeholder="Contraseña" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
              />
            </div>
            <button type="submit" className="login-btn" disabled={cargando}>
              {cargando ? <Loader2 className="animate-spin" /> : <>Entrar <ArrowRight size={20} /></>}
            </button>
            <div className="status-msg-container">
              <p className={`status-msg ${mensaje ? 'visible' : 'hidden'}`}>{mensaje}</p>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <nav className="sidebar-nav">
        <div className="nav-logo-container">
          <Bus /> SchoolWay
        </div>
        <ul className="nav-links">
          <li className="active"><Users size={18} /> Usuarios</li>
        </ul>
        <button className="logout-btn" onClick={() => setUser(null)}>
          <LogOut size={18} /> Salir
        </button>
      </nav>
      <main className="content-area">
        <header className="content-header">
          <h1>Gestión de Usuarios</h1>
          <p>Bienvenido, <strong>{user.nombre_completo}</strong></p>
        </header>
        <div className="table-wrapper">
          <table className="admin-table">
            <thead>
              <tr><th>Nombre</th><th>Correo</th><th>Rol</th><th>Acciones</th></tr>
            </thead>
            <tbody>
              {listaUsuarios.map(u => (
                <tr key={u.id_usuario}>
                  <td>{u.nombre_completo}</td>
                  <td>{u.correo}</td>
                  <td><span className={`badge ${u.rol.toLowerCase()}`}>{u.rol}</span></td>
                  <td><button className="edit-action-btn">Editar</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

export default App;