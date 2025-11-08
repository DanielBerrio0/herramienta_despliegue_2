// config/config.js
module.exports = {
    // Configuración del servidor
    PORT: process.env.PORT || 3000,
    HOST: process.env.HOST || '0.0.0.0',
    
    // Configuración de la base de datos
    DB_CONFIG: {
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || 'root',
        database: process.env.DB_NAME || 'iso_tool',
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
    },
    
    // Configuración JWT
    JWT_CONFIG: {
        secret: process.env.JWT_SECRET_KEY || 'superclave-ultra-secreta-12345',
        expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRES || '1h',
        headerName: process.env.JWT_HEADER_NAME || 'Authorization',
        headerType: process.env.JWT_HEADER_TYPE || 'Bearer'
    },
    
    // Configuración CORS
    CORS_CONFIG: {
        origin: process.env.CORS_ORIGIN || '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
        allowedHeaders: ['Content-Type', 'Authorization']
    }
};
