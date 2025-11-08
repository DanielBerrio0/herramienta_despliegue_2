// config/database.js
const mysql = require('mysql2/promise');
const config = require('./config');

let pool = null;

const initDatabase = () => {
    if (!pool) {
        pool = mysql.createPool(config.DB_CONFIG);
        
        // Verificación de conexión
        pool.getConnection()
            .then(() => {
                console.log('✅ Conexión a MySQL exitosa');
            })
            .catch(err => {
                console.error('❌ Error al conectar a MySQL:', err);
                process.exit(1);
            });
    }
    return pool;
};

const getPool = () => {
    if (!pool) {
        throw new Error('Database no ha sido inicializada. Llama a initDatabase() primero.');
    }
    return pool;
};

module.exports = {
    initDatabase,
    getPool
};
