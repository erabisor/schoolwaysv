const { Request, TYPES } = require('tedious');
const db = require('../config/database');

exports.login = (req, res) => {
    const { correo, password } = req.body;

    const query = `
        SELECT UsuarioID, NombreCompleto, CorreoElectronico, PasswordHash, Rol 
        FROM Usuarios 
        WHERE CorreoElectronico = @correo`;

    const request = new Request(query, (err, rowCount, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        
        if (rowCount === 0) {
            return res.status(401).json({ mensaje: "Usuario no encontrado" });
        }

        let user = {};
        rows[0].forEach(col => {
            user[col.metadata.colName] = col.value;
        });

        const dbPassword = user.PasswordHash ? user.PasswordHash.toString().trim() : "";
        const inputPassword = password ? password.toString().trim() : "";

        console.log(`Comparando DB: [${dbPassword}] con Input: [${inputPassword}]`);

        if (dbPassword === inputPassword) {
            delete user.PasswordHash;
            res.json(user);
        } else {
            res.status(401).json({ mensaje: "Contraseña incorrecta" });
        }
    });

    request.addParameter('correo', TYPES.VarChar, correo);
    db.connection.execSql(request);
};