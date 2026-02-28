// src/components/Sidebar.js
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, Bus, MapPin, UserSquare2, GraduationCap, LogOut } from 'lucide-react';

function Sidebar({ onLogout }) {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { name: 'Dashboard', icon: <LayoutDashboard size={24} />, path: '/admin/dashboard' },
    { name: 'Usuarios', icon: <Users size={24} />, path: '/admin/usuarios' },
    { name: 'Rutas', icon: <MapPin size={24} />, path: '/admin/rutas' },
    { name: 'Conductores', icon: <UserSquare2 size={24} />, path: '/admin/conductores' },
    { name: 'Alumnos', icon: <GraduationCap size={24} />, path: '/admin/alumnos' },
  ];

  return (
    <nav className="sidebar-nav">
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '0 12px', marginBottom: '32px' }}>
        <div style={{ background: 'white', padding: '8px', borderRadius: '10px' }}>
          <Bus size={24} color="#2563eb" />
        </div>
        <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'white', margin: 0 }}>SchoolWay</h2>
      </div>

      <ul className="nav-links">
        {menuItems.map((item) => (
          <li 
            key={item.name} 
            className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
            onClick={() => navigate(item.path)}
          >
            {item.icon}
            <span>{item.name}</span>
          </li>
        ))}
      </ul>

      <button className="logout-btn" onClick={onLogout}>
        <LogOut size={20} />
        <span>Cerrar Sesión</span>
      </button>
    </nav>
  );
}
export default Sidebar;