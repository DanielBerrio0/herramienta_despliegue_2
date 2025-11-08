// server.js
// Punto de entrada principal - Similar al if __name__ == "__main__" de Python
const createApp = require('./app');
const config = require('./config/config');

// Crear instancia de la aplicación
const app = createApp();

// Iniciar el servidor
// Actualizado para aplicar variables de entorno de Railway
if (require.main === module) {
    app.listen(config.PORT, config.HOST, () => {
        console.log('='.repeat(50));
        console.log('🚀 Servidor ISO Tool iniciado');
        console.log('='.repeat(50));
        console.log(`📍 URL: http://localhost:${config.PORT}`);
        console.log(`🌐 Host: ${config.HOST}`);
        console.log(`⏰ Fecha: ${new Date().toISOString()}`);
        console.log('='.repeat(50));
    });
}

// Exportar para pruebas o uso externo (similar a crear app para Gunicorn)
module.exports = app;
