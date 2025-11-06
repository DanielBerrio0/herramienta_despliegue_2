const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

// Conexión a MySQL y rutas
const db = require('./db/db');           
const authRoutes = require('./routes/auth'); 
const registro27001Routes = require('./routes/registro27001'); // nueva ruta para ISO 27001
const registro9001Routes = require('./routes/registro9001');   // nueva ruta para ISO 9001

// Middleware
app.use(cors());          // Habilita CORS para todos los orígenes
app.use(express.json());  // Parsear JSON

// Rutas
app.use('/api', authRoutes);
app.use('/api/27001', registro27001Routes);  // endpoints para ISO 27001
app.use('/api/9001', registro9001Routes);    // endpoints para ISO 9001

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('Servidor funcionando correctamente ✅');
});

// Inicio del servidor
app.listen(PORT, () => {
  console.log(`Servidor iniciado en http://localhost:${PORT}`);
});
