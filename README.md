# ISO Tool - API Backend

API REST para gestión de certificaciones ISO 9001 y 27001.

## 🚀 Despliegue en Railway

### Paso 1: Crear el proyecto en Railway
1. Ve a [Railway](https://railway.app)
2. Haz clic en "New Project"
3. Selecciona "Deploy from GitHub repo"
4. Selecciona este repositorio

### Paso 2: Agregar base de datos MySQL
1. En tu proyecto de Railway, haz clic en "+ New"
2. Selecciona "Database" → "Add MySQL"
3. Railway creará automáticamente las variables de entorno

### Paso 3: Configurar variables de entorno
En tu servicio backend, agrega estas variables (Railway las detectará automáticamente de MySQL):

```
PORT=3000
DB_HOST=${{MySQL.MYSQLHOST}}
DB_USER=${{MySQL.MYSQLUSER}}
DB_PASSWORD=${{MySQL.MYSQLPASSWORD}}
DB_NAME=iso_tool
JWT_SECRET_KEY=tu-clave-secreta-super-segura
```

### Paso 4: Inicializar la base de datos
Después de que se despliegue, conecta a MySQL y ejecuta:

```bash
railway connect MySQL
```

Luego copia y pega el contenido de `base_datos.sql`

## 📋 Variables de Entorno

| Variable | Descripción | Valor por defecto |
|----------|-------------|-------------------|
| `PORT` | Puerto del servidor | `3000` |
| `DB_HOST` | Host de MySQL | `localhost` |
| `DB_USER` | Usuario de MySQL | `root` |
| `DB_PASSWORD` | Contraseña de MySQL | `root` |
| `DB_NAME` | Nombre de la base de datos | `iso_tool` |
| `JWT_SECRET_KEY` | Clave secreta para JWT | `superclave-ultra-secreta-12345` |

## 🛠️ Desarrollo Local

### Requisitos
- Node.js >= 18.0.0
- MySQL 8.0

### Instalación

```bash
# Instalar dependencias
npm install

# Configurar base de datos
mysql -u root -p < base_datos.sql

# Iniciar servidor
npm start
```

### Ejecutar en desarrollo

```bash
npm run dev
```

El servidor estará disponible en `http://localhost:3000`

## 📚 Endpoints de la API

### Información
- `GET /` - Información de la API
- `GET /health` - Health check

### Autenticación
- `POST /api/login` - Login de usuario

**Body:**
```json
{
  "username": "admin",
  "password": "password"
}
```

### ISO 9001
- `POST /api/9001/registro` - Crear registro ISO 9001

**Body:**
```json
{
  "razon_social": "Empresa S.A.",
  "nit": "123456789",
  "representante": "Juan Pérez",
  "sector": "Tecnología",
  "tipo": "S.A.S",
  "direccion": "Calle 123",
  "telefono": "3001234567",
  "empleados": 50,
  "email": "contacto@empresa.com",
  "web": "https://empresa.com",
  "facebook": "empresa",
  "instagram": "empresa",
  "tiktok": "empresa"
}
```

### ISO 27001
- `POST /api/27001/registro27001` - Crear registro ISO 27001

**Body:** (Mismo formato que ISO 9001)

## 🔑 Credenciales por defecto

```
Usuario: admin
Contraseña: password
```

## 📁 Estructura del Proyecto

```
.
├── backend/
│   ├── app.js              # Configuración de la aplicación
│   ├── server.js           # Punto de entrada
│   ├── config/
│   │   ├── config.js       # Configuración general
│   │   └── database.js     # Conexión a MySQL
│   ├── routes/
│   │   ├── auth.js         # Rutas de autenticación
│   │   ├── registro9001.js # Rutas ISO 9001
│   │   └── registro27001.js# Rutas ISO 27001
│   └── db/
│       └── db.js           # Pool de conexiones
├── base_datos.sql          # Script de inicialización DB
└── package.json            # Dependencias

```

## 👨‍💻 Autor

**DanielBerrio0**
- GitHub: [@DanielBerrio0](https://github.com/DanielBerrio0)

## 📄 Licencia

ISC
