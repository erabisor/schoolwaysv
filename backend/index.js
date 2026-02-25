const express = require('express');
const cors = require('cors');
const db = require('./database'); 
const { Request, TYPES } = require('tedious');

const app = express();
app.use(cors());
app.use(express.json());

// 1. Endpoint de Login SIMPLE (Sin bcrypt para pruebas)
app.post('/api/login', (req, res) => {
    const { correo, password } = req.body;
    
    // Buscamos coincidencia directa de correo y la columna password_hash (usándola como texto plano)
    const query = "SELECT id_usuario, nombre_completo, rol, activo FROM Usuarios WHERE correo = @correo AND password_hash = @pass";
    
    const request = new Request(query, (err, rowCount) => {
        if (err) return res.status(500).json({ error: err.message });
        if (rowCount === 0) return res.status(401).json({ message: "Credenciales incorrectas" });
    });

    request.addParameter('correo', TYPES.VarChar, correo);
    request.addParameter('pass', TYPES.VarChar, password); // Comparación directa

    let user = {};
    request.on('row', columns => {
        columns.forEach(col => user[col.metadata.colName] = col.value);
    });

    request.on('requestCompleted', () => {
        if (user.id_usuario) {
            res.json(user);
        }
    });

    db.connection.execSql(request);
});

// 2. CRUD: Obtener todos los usuarios
app.get('/api/usuarios', (req, res) => {
    const query = "SELECT id_usuario, nombre_completo, correo, rol, activo FROM Usuarios";
    const request = new Request(query, (err) => {
        if (err) return res.status(500).json({ error: err.message });
    });

    let usuarios = [];
    request.on('row', columns => {
        let u = {};
        columns.forEach(col => u[col.metadata.colName] = col.value);
        usuarios.push(u);
    });

    request.on('requestCompleted', () => res.json(usuarios));
    db.connection.execSql(request);
});

// 3. CRUD: Actualizar Rol o Estado
app.put('/api/usuarios/:id', (req, res) => {
    const { id } = req.params;
    const { rol, activo } = req.body;
    const query = "UPDATE Usuarios SET rol = @rol, activo = @activo WHERE id_usuario = @id";
    
    const request = new Request(query, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Usuario actualizado correctamente" });
    });

    request.addParameter('id', TYPES.Int, id);
    request.addParameter('rol', TYPES.VarChar, rol);
    request.addParameter('activo', TYPES.Bit, activo ? 1 : 0);
    
    db.connection.execSql(request);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor SchoolWaySV en puerto ${PORT} (MODO TEST)`);
    db.connect(); 
});