const express = require('express');
const router = express.Router();
const pool = require('../db/db'); // pool directamente
const crypto = require('crypto');

// Ruta para login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ success: false, message: 'Faltan datos' });
  }

  // Convertimos la contraseña ingresada a SHA-256
  const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');

  const query = 'SELECT * FROM usuarios WHERE username = ? AND password_hash = ? LIMIT 1';

  try {
    const [results] = await pool.execute(query, [username, hashedPassword]);

    if (results.length === 1) {
      res.json({ success: true, message: 'Login exitoso' });
    } else {
      res.status(401).json({ success: false, message: 'Usuario o contraseña incorrectos' });
    }

  } catch (err) {
    console.error('Error en consulta:', err);
    res.status(500).json({ success: false, message: 'Error interno' });
  }
});

module.exports = router;


