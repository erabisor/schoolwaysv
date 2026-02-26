import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';
 
function DashboardUser() {
 
  const location = useLocation();
  const navigate = useNavigate();
  const user = location.state?.user;
 
  const cerrarSesion = () => {
    navigate('/');
  };
 
  return (
<div style={{
      height: "100vh",
      background: "#f1f5f9",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "Arial"
    }}>
 
      <div style={{
        background: "white",
        padding: "40px",
        borderRadius: "16px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        textAlign: "center"
      }}>
 
        <h1>Panel de Usuario</h1>
<h2>Bienvenido {user?.NombreCompleto}</h2>
<p style={{ marginTop: "10px", color: "gray" }}>
          Acceso limitado al sistema.
</p>
 
        <button
          onClick={cerrarSesion}
          style={{
            marginTop: "20px",
            background: "#ef4444",
            border: "none",
            padding: "10px 20px",
            color: "white",
            borderRadius: "8px",
            cursor: "pointer"
          }}
>
<LogOut size={16} /> Cerrar sesión
</button>
 
      </div>
 
    </div>
  );
}
 
export default DashboardUser;