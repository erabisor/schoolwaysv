const { Connection } = require('tedious');
 
const config = {
    server: process.env.DB_SERVER || 'db.schoolwaysv.online',
    authentication: {
        type: 'default',
        options: {
            userName: process.env.DB_USER || 'sa',
            password: process.env.DB_PASSWORD || 'Up3d2026ProAp#'
        }
    },
    options: {
        database: process.env.DB_NAME || 'schoolwaysv',
        encrypt: true,
        trustServerCertificate: true,
        port: 1433,
        rowCollectionOnRequestCompletion: true
    }
};
 
const connection = new Connection(config);
 
connection.on('connect', err => {
    if (err) {
        console.error('❌ Error conectando a SQL Server:', err.message);
    } else {
        console.log('✅ Conectado correctamente a SQL Server');
    }
});
 
module.exports = {
    connection,
    connect: () => connection.connect()
};