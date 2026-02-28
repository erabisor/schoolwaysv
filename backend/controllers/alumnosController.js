const { Request, TYPES } = require('tedious');
const db = require('../config/database');

exports.getAlumnos = (req, res) => {
    // Consulta que une al alumno con el nombre de su ruta para la tabla del frontend
    const query = `
        SELECT a.AlumnoID, a.Nombre, a.Apellido, a.Telefono, r.NombreRuta, a.Estado 
        FROM Alumnos a 
        LEFT JOIN Rutas r ON a.RutaID = r.RutaID`;
    
    const request = new Request(query, (err, rowCount, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        let alumnos = [];
        rows.forEach(row => {
            let item = {};
            row.forEach(col => item[col.metadata.colName] = col.value);
            alumnos.push(item);
        });
        res.json(alumnos);
    });
    db.connection.execSql(request);
};

exports.createAlumno = (req, res) => {
    const { nombre, apellido, direccion, telefono, rutaId } = req.body;
    const query = `INSERT INTO Alumnos (Nombre, Apellido, Direccion, Telefono, RutaID, Estado, FechaIngreso) 
                   VALUES (@nombre, @apellido, @direccion, @telefono, @rutaId, 1, GETDATE())`;
    
    const request = new Request(query, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ mensaje: "Alumno registrado con éxito" });
    });

    request.addParameter('nombre', TYPES.VarChar, nombre);
    request.addParameter('apellido', TYPES.VarChar, apellido);
    request.addParameter('direccion', TYPES.VarChar, direccion);
    request.addParameter('telefono', TYPES.VarChar, telefono);
    request.addParameter('rutaId', TYPES.Int, rutaId);

    db.connection.execSql(request);
};