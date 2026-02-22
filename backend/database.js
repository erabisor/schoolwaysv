const { Connection, Request } = require('tedious');

// Configuración de la conexión usando variables de entorno
// Estas variables se las pasaremos al contenedor al hacer el 'docker run'
const config = {
    server: process.env.DB_SERVER || 'db.schoolwaysv.online', 
    authentication: {
        type: 'default',
        options: {
            userName: process.env.DB_USER || 'sa',
            password: process.env.DB_PASSWORD || 'Up3d2026ProAp#',
        }
    },
    options: {
        database: process.env.DB_NAME || 'schoolwaysv',
        encrypt: true,
        trustServerCertificate: true, // Necesario para conexiones locales/VPN
        port: 1433
    }
};

const connection = new Connection(config);

const connect = () => {
    connection.on('connect', (err) => {
        if (err) {
            console.error('❌ Error de conexión a la base de datos:', err.message);
            // Reintento automático en caso de fallo
            setTimeout(connect, 5000);
        } else {
            console.log('✅ Conectado exitosamente al Servidor SQL (Servidor A)');
        }
    });

    connection.connect();
};

module.exports = {
    connection,
    connect
};