const { Request, TYPES } = require('tedious');
const db = require('../config/database');

// --- LEER TODOS LOS USUARIOS ---
exports.getUsuarios = (req, res) => {
    const query = "SELECT UsuarioID, NombreCompleto, CorreoElectronico, Rol FROM Usuarios";
    const request = new Request(query, (err, rowCount, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        let usuarios = [];
        rows.forEach(row => {
            let item = {};
            row.forEach(col => item[col.metadata.colName] = col.value);
            usuarios.push(item);
        });
        res.json(usuarios);
    });
    db.connection.execSql(request);
};

// --- AGREGAR NUEVO USUARIO ---
exports.createUsuario = (req, res) => {
    const { nombre, correo, password, rol } = req.body;
    
    const query = `INSERT INTO Usuarios (NombreCompleto, CorreoElectronico, PasswordHash, Rol, FechaRegistro) 
                   VALUES (@nombre, @correo, @password, @rol, GETDATE())`;
    
    const request = new Request(query, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ mensaje: "Usuario creado con éxito" });
    });

    request.addParameter('nombre', TYPES.VarChar, nombre);
    request.addParameter('correo', TYPES.VarChar, correo);
    request.addParameter('password', TYPES.VarChar, password);
    request.addParameter('rol', TYPES.VarChar, rol);

    db.connection.execSql(request);
};

// ACTUALIZAR USUARIO EXISTENTE 
exports.updateUsuario = (req, res) => {
    const { id } = req.params;
    const { nombre, correo, password, rol } = req.body;

    let query = `UPDATE Usuarios 
                 SET NombreCompleto = @nombre, CorreoElectronico = @correo, Rol = @rol`;
    if (password) query += `, PasswordHash = @password`;
    query += ` WHERE UsuarioID = @id`;

    const request = new Request(query, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ mensaje: "Usuario actualizado con éxito" });
    });

    request.addParameter('id', TYPES.Int, id);
    request.addParameter('nombre', TYPES.VarChar, nombre);
    request.addParameter('correo', TYPES.VarChar, correo);
    if (password) request.addParameter('password', TYPES.VarChar, password);
    request.addParameter('rol', TYPES.VarChar, rol);

    db.connection.execSql(request);
};

// --- ELIMINAR USUARIO ---
exports.deleteUsuario = (req, res) => {
    const { id } = req.params;
    const query = "DELETE FROM Usuarios WHERE UsuarioID = @id";
    
    const request = new Request(query, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ mensaje: "Usuario eliminado correctamente" });
    });

    request.addParameter('id', TYPES.Int, id);
    db.connection.execSql(request);
};

exports.getConductores = (req, res) => {
    const query = "SELECT UsuarioID, NombreCompleto, CorreoElectronico, Rol FROM Usuarios WHERE Rol = 'Conductor'";
    const request = new Request(query, (err, rowCount, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        let conductores = [];
        rows.forEach(row => {
            let item = {};
            row.forEach(col => item[col.metadata.colName] = col.value);
            conductores.push(item);
        });
        res.json(conductores);
    });
    db.connection.execSql(request);
};