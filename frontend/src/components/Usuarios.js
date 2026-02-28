import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import { Edit2, Trash2, Plus, X, CheckCircle, AlertCircle, AlertTriangle } from 'lucide-react';

function Usuarios({ user, onLogout }) {
  const [listaUsuarios, setListaUsuarios] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [idEliminar, setIdEliminar] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [notificacion, setNotificacion] = useState({ visible: false, mensaje: '', tipo: '' });
  
  const [formData, setFormData] = useState({ 
    UsuarioID: null, nombre: '', correo: '', password: '', rol: 'Usuario' 
  });
  
  const API_URL = 'http://localhost:5000';

  const mostrarAviso = (msg, tipo) => {
    setNotificacion({ visible: true, mensaje: msg, tipo });
    setTimeout(() => setNotificacion({ visible: false, mensaje: '', tipo: '' }), 3000);
  };

  const cargarUsuarios = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/usuarios`);
      setListaUsuarios(res.data);
    } catch (e) { mostrarAviso("Error al conectar con la base de datos", "error"); }
  };

  useEffect(() => { cargarUsuarios(); }, []);

  const ejecutarEliminado = async () => {
    try {
      await axios.delete(`${API_URL}/api/usuarios/${idEliminar}`);
      cargarUsuarios();
      setShowConfirm(false);
      mostrarAviso("Usuario eliminado con éxito", "success");
    } catch (e) { 
      mostrarAviso("No se pudo eliminar el usuario", "error"); 
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editMode) {
        await axios.put(`${API_URL}/api/usuarios/${formData.UsuarioID}`, formData);
        mostrarAviso("Usuario actualizado correctamente", "success");
      } else {
        await axios.post(`${API_URL}/api/usuarios`, formData);
        mostrarAviso("Usuario creado con éxito", "success");
      }
      cargarUsuarios();
      setShowModal(false);
    } catch (err) { mostrarAviso("Error en la operación", "error"); }
  };

  return (
    <div className="dashboard-container">
      {notificacion.visible && (
        <div className={`toast-notification ${notificacion.tipo}`}>
          {notificacion.tipo === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
          <span>{notificacion.mensaje}</span>
        </div>
      )}

      <Sidebar onLogout={onLogout} />
      
      <main className="content-area">
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
          <h1>Gestión de Usuarios</h1>
          <button className="login-btn-split" onClick={() => { setEditMode(false); setFormData({UsuarioID:null, nombre:'', correo:'', password:'', rol:'Usuario'}); setShowModal(true); }}
            style={{ width: 'auto', background: '#2563eb', color: 'white', padding: '12px 24px', borderRadius: '10px', border: 'none', fontWeight: '800', cursor: 'pointer' }}>
            <Plus size={18} /> Nuevo Usuario
          </button>
        </header>

        <div className="table-card">
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ textAlign: 'left', background: '#f8fafc' }}>
                <th style={{ padding: '16px' }}>Nombre</th>
                <th style={{ padding: '16px' }}>Correo</th>
                <th style={{ padding: '16px' }}>Rol</th>
                <th style={{ padding: '16px', textAlign: 'center' }}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {listaUsuarios.map((u) => (
                <tr key={u.UsuarioID} style={{ borderTop: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '16px', fontWeight: '600' }}>{u.NombreCompleto}</td>
                  <td style={{ padding: '16px' }}>{u.CorreoElectronico}</td>
                  <td style={{ padding: '16px' }}><span className="role-badge" style={{ background: '#eff6ff', color: '#2563eb', padding: '4px 12px', borderRadius: '99px', fontSize: '12px', fontWeight: '700' }}>{u.Rol}</span></td>
                  <td style={{ padding: '16px', display: 'flex', gap: '15px', justifyContent: 'center' }}>
                    <button onClick={() => { setFormData({UsuarioID:u.UsuarioID, nombre:u.NombreCompleto, correo:u.CorreoElectronico, password:'', rol:u.Rol}); setEditMode(true); setShowModal(true); }} style={{ color: '#2563eb', background: 'none', border: 'none', cursor: 'pointer' }}><Edit2 size={20} /></button>
                    
          
                    <button onClick={() => { setIdEliminar(u.UsuarioID); setShowConfirm(true); }} style={{ color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer' }}><Trash2 size={20} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>


      {showModal && (
        <div className="modal-overlay" style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div className="modal-content" style={{ background: 'white', padding: '32px', borderRadius: '16px', width: '420px', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' }}>
            <h3 style={{ marginBottom: '24px', fontSize: '1.5rem' }}>{editMode ? 'Editar Usuario' : 'Nuevo Usuario'}</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group"><label>Nombre</label><input className="form-input" required value={formData.nombre} onChange={e => setFormData({...formData, nombre: e.target.value})} /></div>
              <div className="form-group"><label>Correo</label><input className="form-input" type="email" required value={formData.correo} onChange={e => setFormData({...formData, correo: e.target.value})} /></div>
              <div className="form-group"><label>Contraseña {editMode && '(Opcional)'}</label><input className="form-input" type="password" required={!editMode} value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} /></div>
              <div className="form-group">
                <label>Rol</label>
                <select className="form-input" value={formData.rol} onChange={e => setFormData({...formData, rol: e.target.value})}>
                  <option value="Usuario">Usuario</option><option value="Conductor">Conductor</option><option value="Admin">Admin</option>
                </select>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '30px' }}>
                <button type="button" onClick={() => setShowModal(false)} style={{ padding: '12px 20px', borderRadius: '8px', border: 'none', background: '#f1f5f9', fontWeight: '600', cursor: 'pointer' }}>Cancelar</button>
                <button type="submit" style={{ padding: '12px 24px', borderRadius: '8px', border: 'none', background: '#2563eb', color: 'white', fontWeight: '800', cursor: 'pointer' }}>Guardar</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showConfirm && (
        <div className="modal-overlay" style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div className="modal-content" style={{ background: 'white', padding: '30px', borderRadius: '16px', textAlign: 'center', maxWidth: '350px' }}>
            <AlertTriangle size={48} color="#ef4444" style={{ margin: '0 auto 15px' }} />
            <h3 style={{ fontWeight: '800' }}>¿Eliminar usuario?</h3>
            <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '25px' }}>Esta acción no se puede deshacer.</p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '15px' }}>
              <button onClick={() => setShowConfirm(false)} style={{ padding: '10px 20px', borderRadius: '8px', border: 'none', background: '#f1f5f9', fontWeight: '600', cursor: 'pointer' }}>Cancelar</button>
              <button onClick={ejecutarEliminado} style={{ padding: '10px 20px', borderRadius: '8px', border: 'none', background: '#ef4444', color: 'white', fontWeight: '700', cursor: 'pointer' }}>Eliminar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Usuarios;