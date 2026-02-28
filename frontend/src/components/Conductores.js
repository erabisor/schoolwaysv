// src/components/Conductores.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';

function Conductores({ user, onLogout }) {
  const [conductores, setConductores] = useState([]);
  const API_URL = 'http://localhost:5000';

  useEffect(() => {
    const cargarConductores = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/usuarios/conductores`);
        setConductores(res.data);
      } catch (e) { console.error("Error al cargar conductores", e); }
    };
    cargarConductores();
  }, []);

  return (
    <div className="dashboard-container">
      <Sidebar onLogout={onLogout} />
      <main className="content-area">
        <h1 style={{ fontSize: '2.5rem', marginBottom: '8px' }}>Gestión de Conductores</h1>
        <div className="table-card">
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ textAlign: 'left', background: '#f8fafc' }}>
                <th style={{ padding: '16px' }}>Nombre</th>
                <th style={{ padding: '16px' }}>Correo</th>
                <th style={{ padding: '16px' }}>Rol</th>
              </tr>
            </thead>
            <tbody>
              {conductores.map((c) => (
                <tr key={c.UsuarioID} style={{ borderTop: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '16px', fontWeight: '600' }}>{c.NombreCompleto}</td>
                  <td style={{ padding: '16px' }}>{c.CorreoElectronico}</td>
                  <td style={{ padding: '16px' }}><span className="role-badge" style={{ background: '#eff6ff', color: '#2563eb' }}>{c.Rol}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
export default Conductores;