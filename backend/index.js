const express = require('express');
const cors = require('cors');
const db = require('./database'); 
const { Request, TYPES } = require('tedious');
const app = express();

app.use(cors());
app.use(express.json());

app.get('/status', (req, res) => {
    res.json({ backend: "Online", database_host: process.env.DB_SERVER });
});

app.post('/api/login', (req, res) => {
    const { correo, password } = req.body;
    const query = "SELECT id_usuario, nombre_completo, rol FROM Usuarios WHERE correo = @correo AND password_hash = @pass AND activo = 1";
    
    const request = new Request(query, (err, rowCount) => {
        if (err) return res.status(500).json({ error: err.message });
        if (rowCount === 0) return res.status(401).json({ message: "Credenciales inválidas" });
    });

    request.addParameter('correo', TYPES.VarChar, correo);
    request.addParameter('pass', TYPES.VarChar, password);

    let user = {};
    request.on('row', columns => {
        columns.forEach(col => user[col.metadata.colName] = col.value);
    });

    request.on('requestCompleted', () => res.json(user));
    db.connection.execSql(request);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Backend escuchando en puerto ${PORT}`);
    db.connect(); 
});