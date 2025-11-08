// config/database.js
const mysql = require('mysql2/promise');
const config = require('./config');

let pool = null;

const initDatabase = () => {
    if (!pool) {
        console.log('🔧 Configuración MySQL:', {
            host: config.DB_CONFIG.host,
            port: config.DB_CONFIG.port,
            user: config.DB_CONFIG.user,
            database: config.DB_CONFIG.database
        });
        
        pool = mysql.createPool(config.DB_CONFIG);
        
        // Verificación de conexión sin forzar cierre
        pool.getConnection()
            .then((connection) => {
                console.log('✅ Conexión a MySQL exitosa');
                connection.release();
            })
            .catch(err => {
                console.error('❌ Error al conectar a MySQL:', err.message);
                console.error('🔍 Código de error:', err.code);
                console.error('💡 Verifica que las variables DB_HOST, DB_USER, DB_PASSWORD, DB_NAME estén correctas');
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
