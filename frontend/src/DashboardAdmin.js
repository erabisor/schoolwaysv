import React from 'react';

import { useLocation, useNavigate } from 'react-router-dom';

import { LayoutDashboard, Users, Bus, Settings, LogOut } from 'lucide-react';
 
function DashboardAdmin() {
 
  const location = useLocation();

  const navigate = useNavigate();

  const user = location.state?.user;
 
  const cerrarSesion = () => {

    navigate('/');

  };
 
  return (
<div style={{ display: "flex", height: "100vh", fontFamily: "Arial" }}>
 
      <div style={{

        width: "250px",

        background: "#0f172a",

        color: "white",

        padding: "20px",

        display: "flex",

        flexDirection: "column",

        justifyContent: "space-between"

      }}>
 
        <div>
<h2 style={{ marginBottom: "40px" }}>SchoolWaySV</h2>
 
          <div style={{ marginBottom: "20px", display: "flex", gap: "10px" }}>
<LayoutDashboard size={18} /> Dashboard
</div>
 
          <div style={{ marginBottom: "20px", display: "flex", gap: "10px" }}>
<Users size={18} /> Usuarios
</div>
 
          <div style={{ marginBottom: "20px", display: "flex", gap: "10px" }}>
<Bus size={18} /> Transporte
</div>
 
          <div style={{ marginBottom: "20px", display: "flex", gap: "10px" }}>
<Settings size={18} /> Configuración
</div>
</div>
 
        <button

          onClick={cerrarSesion}

          style={{

            background: "#ef4444",

            border: "none",

            padding: "10px",

            color: "white",

            borderRadius: "8px",

            cursor: "pointer"

          }}
>
<LogOut size={16} /> Cerrar sesión
</button>
 
      </div>
 
      <div style={{ flex: 1, background: "#f1f5f9", padding: "30px" }}>
<h1>Panel de Administrador</h1>
<h3>Bienvenido {user?.NombreCompleto}</h3>
 
        <div style={{ marginTop: "30px", display: "flex", gap: "20px" }}>
<div style={{ background: "white", padding: "20px", borderRadius: "12px", flex: 1 }}>
<h3>Total Usuarios</h3>
<p style={{ fontSize: "24px", fontWeight: "bold" }}>45</p>
</div>
 
          <div style={{ background: "white", padding: "20px", borderRadius: "12px", flex: 1 }}>
<h3>Rutas Activas</h3>
<p style={{ fontSize: "24px", fontWeight: "bold" }}>8</p>
</div>
</div>
</div>
 
    </div>

  );

}
 
export default DashboardAdmin;
 