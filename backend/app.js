// app.js
const express = require('express');
const cors = require('cors');
const config = require('./config/config');
const { initDatabase } = require('./config/database');

// Importar rutas
const authRoutes = require('./routes/auth'); 
const registro27001Routes = require('./routes/registro27001');
const registro9001Routes = require('./routes/registro9001');

/**
 * Crea y configura la aplicación Express
 * Similar a create_app() de Flask
 */
function createApp() {
    const app = express();
    
    // --- CORS ---
    // Habilita CORS para permitir peticiones desde el frontend
    app.use(cors(config.CORS_CONFIG));
    
    // --- Middleware ---
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    
    // Logging middleware
    app.use((req, res, next) => {
        console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
        next();
    });
    
    // --- Inicializar Base de Datos ---
    initDatabase();
    
    // --- Rutas / Blueprints ---
    app.use('/api', authRoutes);
    app.use('/api/27001', registro27001Routes);
    app.use('/api/9001', registro9001Routes);
    
    // --- API Root ---
    app.get('/', (req, res) => {
        res.json({
            api: 'Herramienta Despliegue - ISO Tool API',
            author: 'DanielBerrio0',
            description: 'API RESTful con Node.js, Express, MySQL2 y arquitectura modular para gestión de certificaciones ISO 9001 y 27001.',
            version: '2.0.0',
            endpoints: {
                'GET /': 'Información de la API',
                'GET /health': 'Health check',
                'POST /api/login': 'Login de usuarios',
                'POST /api/9001/registro': 'Crear registro ISO 9001',
                'POST /api/27001/registro27001': 'Crear registro ISO 27001'
            },
            repository: 'https://github.com/DanielBerrio0/herramienta_despliegue_2',
            status: 'OK'
        });
    });
    
    // --- Health Check ---
    app.get('/health', (req, res) => {
        res.json({
            status: 'OK',
            message: 'API is running',
            timestamp: new Date().toISOString(),
            uptime: process.uptime()
        });
    });
    
    // --- Manejo de errores 404 ---
    app.use((req, res) => {
        res.status(404).json({
            error: 'Not Found',
            message: `La ruta ${req.method} ${req.path} no existe`,
            timestamp: new Date().toISOString()
        });
    });
    
    // --- Manejo de errores global ---
    app.use((err, req, res, next) => {
        console.error('Error:', err);
        res.status(err.status || 500).json({
            error: err.message || 'Internal Server Error',
            timestamp: new Date().toISOString()
        });
    });
    
    return app;
}

module.exports = createApp;
