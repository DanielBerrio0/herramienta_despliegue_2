// config/config.js

// Parsear DATABASE_URL o MYSQL_PUBLIC_URL si existe (para Railway)
const parseDatabaseUrl = () => {
    const dbUrl = process.env.DATABASE_URL || process.env.MYSQL_PUBLIC_URL;
    
    if (dbUrl) {
        console.log('🔍 Parseando DATABASE_URL:', dbUrl ? 'encontrada' : 'no encontrada');
        // Formato: mysql://user:password@host:port/database
        const match = dbUrl.match(/mysql:\/\/([^:]+):([^@]+)@([^:]+):(\d+)\/(.+)/);
        if (match) {
            console.log('✅ URL parseada exitosamente');
            return {
                host: match[3],
                port: parseInt(match[4]),
                user: match[1],
                password: match[2],
                database: match[5]
            };
        }
    }
    
    console.log('⚠️  No se encontró DATABASE_URL, usando variables individuales o defaults');
    return null;
};

const dbFromUrl = parseDatabaseUrl();

// Detectar si estamos en Railway (Railway siempre setea RAILWAY_ENVIRONMENT)
const isRailway = !!process.env.RAILWAY_ENVIRONMENT;

module.exports = {
    // Configuración del servidor
    PORT: process.env.PORT || 3000,
    HOST: process.env.HOST || '0.0.0.0',
    
    // Configuración de la base de datos
    DB_CONFIG: {
        host: dbFromUrl?.host || process.env.DB_HOST || (isRailway ? 'nozomi.proxy.rlwy.net' : 'localhost'),
        port: dbFromUrl?.port || parseInt(process.env.DB_PORT) || (isRailway ? 14570 : 3306),
        user: dbFromUrl?.user || process.env.DB_USER || 'root',
        password: dbFromUrl?.password || process.env.DB_PASSWORD || (isRailway ? 'lFzMLKxyMpyQGOIIDhtwiWGfMRPkAxUO' : 'root'),
        database: dbFromUrl?.database || process.env.DB_NAME || (isRailway ? 'railway' : 'iso_tool'),
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
