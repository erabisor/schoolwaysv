import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import { GraduationCap, Plus, Search } from 'lucide-react';

function Alumnos({ user, onLogout }) {
  const [listaAlumnos, setListaAlumnos] = useState([]);
  const API_URL = 'http://localhost:5000';

  const cargarAlumnos = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/alumnos`);
      setListaAlumnos(res.data);
    } catch (e) {
      console.error("Error al cargar alumnos", e);
    }
  };

  useEffect(() => {
    cargarAlumnos();
  }, []);

  return (
    <div className="dashboard-container">
      <Sidebar onLogout={onLogout} />
      <main className="content-area">
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
          <div>
            <h1 style={{ fontSize: '2.5rem', marginBottom: '8px' }}>Gestión de Alumnos</h1>
            <p style={{ color: '#64748b' }}>Administración de estudiantes y sus rutas escolares.</p>
          </div>
          <button className="logout-btn" style={{ background: '#2563eb', color: 'white', border: 'none', display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 20px' }}>
            <Plus size={20} /> Nuevo Alumno
          </button>
        </header>

        <div className="table-card" style={{ background: 'white', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #f1f5f9', textAlign: 'left' }}>
                <th style={{ padding: '15px', color: '#64748b' }}>Alumno</th>
                <th style={{ padding: '15px', color: '#64748b' }}>Teléfono</th>
                <th style={{ padding: '15px', color: '#64748b' }}>Ruta Asignada</th>
                <th style={{ padding: '15px', color: '#64748b' }}>Estado</th>
              </tr>
            </thead>
            <tbody>
              {listaAlumnos.length > 0 ? (
                listaAlumnos.map((a) => (
                  <tr key={a.AlumnoID} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '15px', fontWeight: '600' }}>{a.Nombre} {a.Apellido}</td>
                    <td style={{ padding: '15px' }}>{a.Telefono || 'N/A'}</td>
                    <td style={{ padding: '15px' }}>
                      <span style={{ color: '#2563eb', fontWeight: '500' }}>{a.NombreRuta || 'Sin asignar'}</span>
                    </td>
                    <td style={{ padding: '15px' }}>
                      <span style={{ padding: '4px 12px', borderRadius: '20px', fontSize: '12px', background: a.Estado ? '#d1fae5' : '#fee2e2', color: a.Estado ? '#059669' : '#dc2626' }}>
                        {a.Estado ? 'Activo' : 'Inactivo'}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" style={{ padding: '30px', textAlign: 'center', color: '#94a3b8' }}>No hay alumnos registrados</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

export default Alumnos;