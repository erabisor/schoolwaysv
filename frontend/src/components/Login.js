import React, { useState } from 'react';
import axios from 'axios';
import { Bus, Mail, Lock, ShieldCheck } from 'lucide-react';

function Login({ setUser }) {
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const API_URL = 'http://localhost:5000';

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_URL}/api/login`, { correo, password });
      setUser(res.data);
    } catch (err) { alert("Credenciales incorrectas"); }
  };

  return (
    <div className="login-split-container" style={{ display: 'flex', minHeight: '100vh' }}>
      <div className="login-left" style={{ flex: 1, background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px', color: 'white' }}>
        <div style={{ maxWidth: '400px' }}>
          <Bus size={64} />
          <h1 style={{ fontSize: '3.5rem', margin: '20px 0' }}>SchoolWaySV</h1>
          <p style={{ fontSize: '1.2rem', opacity: 0.9 }}>Gestión de transporte escolar confiable.</p>
        </div>
      </div>
      <div className="login-right" style={{ flex: 1, background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px' }}>
        <form style={{ width: '100%', maxWidth: '360px' }} onSubmit={handleLogin}>
          <h2 style={{ fontSize: '2rem', marginBottom: '8px' }}>Bienvenido</h2>
          <p style={{ color: '#64748b', marginBottom: '32px' }}>Ingresa tus datos para acceder</p>
          <div className="form-group" style={{ marginBottom: '20px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '600', marginBottom: '8px' }}><Mail size={16} /> Correo</label>
            <input className="form-input" type="email" placeholder="ejemplo@correo.com" value={correo} onChange={(e) => setCorreo(e.target.value)} required />
          </div>
          <div className="form-group" style={{ marginBottom: '20px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '600', marginBottom: '8px' }}><Lock size={16} /> Contraseña</label>
            <input className="form-input" type="password" placeholder="********" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <button type="submit" style={{ width: '100%', background: '#2563eb', color: 'white', padding: '14px', borderRadius: '10px', border: 'none', fontWeight: '800', cursor: 'pointer' }}>Iniciar Sesión</button>
        </form>
      </div>
    </div>
  );
}
export default Login;