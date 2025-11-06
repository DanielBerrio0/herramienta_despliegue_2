// db/db.js
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'iso_tool',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Verificación de conexión
pool.getConnection()
  .then(() => console.log('Conexión a MySQL exitosa ✅'))
  .catch(err => console.error('Error al conectar a MySQL:', err));

module.exports = pool;
