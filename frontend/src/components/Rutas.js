import React from 'react';
import Sidebar from './Sidebar';

function Rutas({ user, onLogout }) {
  return (
    <div className="dashboard-container">
      <Sidebar onLogout={onLogout} />
      <main className="content-area">
        <h1>Asignación a Rutas</h1>
        <p>Módulo de gestión de transporte para conductores y unidades.</p>
      </main>
    </div>
  );
}

export default Rutas;