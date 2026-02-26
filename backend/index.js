const express = require('express');
const cors = require('cors');
const db = require('./database');
const { Request, TYPES } = require('tedious');
 
const app = express();
 
app.use(cors());
app.use(express.json());
 
app.get('/status', (req, res) => {
    res.json({
        backend: "Online",
        database_host: process.env.DB_SERVER || 'db.schoolwaysv.online'
    });
});
 
app.post('/api/login', (req, res) => {
 
    const { correo, password } = req.body;
 
    const query = `
        SELECT NombreCompleto, CorreoElectronico, Rol
        FROM Usuarios
        WHERE CorreoElectronico = @correo
        AND PasswordHash = @password
    `;
 
    const request = new Request(query, (err, rowCount) => {
 
        if (err) {
            console.error("❌ Error en query:", err);
            return res.status(500).json({ error: err.message });
        }
 
        if (rowCount === 0) {
            return res.status(401).json({ message: "Credenciales inválidas" });
        }
    });
 
    request.addParameter('correo', TYPES.VarChar, correo);
    request.addParameter('password', TYPES.VarChar, password);
 
    let user = {};
 
    request.on('row', columns => {
        columns.forEach(column => {
            user[column.metadata.colName] = column.value;
        });
    });
 
    request.on('requestCompleted', () => {
        res.json(user);
    });
 
    db.connection.execSql(request);
});
 
const PORT = process.env.PORT || 5000;
 
app.listen(PORT, () => {
    console.log(`🚀 Backend ejecutándose en puerto ${PORT}`);
    db.connect();
});