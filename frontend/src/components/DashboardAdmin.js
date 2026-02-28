import React from 'react';
import Sidebar from './Sidebar';
import { Users, Bus, CheckCircle, MapPin } from 'lucide-react';

function DashboardAdmin({ user, onLogout }) {
  const stats = [
    { label: 'Usuarios', value: '12', icon: <Users size={24} color="#2563eb"/>, color: '#dbeafe' },
    { label: 'Rutas', value: '5', icon: <MapPin size={24} color="#10b981"/>, color: '#d1fae5' },
    { label: 'Buses', value: '3', icon: <Bus size={24} color="#f59e0b"/>, color: '#fef3c7' },
    { label: 'Asistencia', value: '85%', icon: <CheckCircle size={24} color="#8b5cf6"/>, color: '#ede9fe' },
  ];

  return (
    <div className="dashboard-container">
      <Sidebar onLogout={onLogout} />
      <main className="content-area">
        <header>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '8px' }}>Panel de Control</h1>
          <p style={{ color: '#64748b' }}>Bienvenido, <strong style={{ color: '#2563eb' }}>{user?.NombreCompleto}</strong></p>
        </header>

        <div className="stats-grid">
          {stats.map((item, index) => (
            <div key={index} className="table-card" style={{ 
              padding: '24px', display: 'flex', alignItems: 'center', gap: '20px' 
            }}>
              <div style={{ background: item.color, padding: '15px', borderRadius: '12px' }}>
                {item.icon}
              </div>
              <div>
                <p style={{ color: '#64748b', fontSize: '14px', fontWeight: 600, margin: 0 }}>{item.label}</p>
                <h3 style={{ fontSize: '24px', margin: 0 }}>{item.value}</h3>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default DashboardAdmin;