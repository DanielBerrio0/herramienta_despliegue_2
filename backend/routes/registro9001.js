const express = require('express');
const router = express.Router();
const pool = require('../db/db'); // nuestro pool de MySQL

// Ruta POST para guardar registro ISO 9001 (sin auth por ahora)
router.post('/registro', async (req, res) => {
  try {
    const {
      razon_social, nit, representante, sector, tipo,
      direccion, telefono, empleados, email, web, facebook,
      instagram, tiktok
    } = req.body;

    // usuario fijo para pruebas
    const creado_por = 1;

    // Conversión y truncado de datos según la tabla
    const data = [
      razon_social?.substring(0,150),
      nit?.substring(0,30),
      representante?.substring(0,120),
      sector?.substring(0,120),
      tipo?.substring(0,100),
      direccion?.substring(0,200),
      telefono?.substring(0,30),
      parseInt(empleados) || 0,
      email?.substring(0,120),
      web?.substring(0,200),
      facebook?.substring(0,200),
      instagram?.substring(0,200),
      tiktok?.substring(0,200),
      creado_por
    ];

    const [result] = await pool.query(
      `INSERT INTO registro9001
       (razon_social, nit, representante_legal, sector_economico, tipo_empresa,
        direccion, telefono, numero_empleados, email, sitio_web,
        facebook, instagram, tiktok, creado_por)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      data
    );

    res.json({ success: true, id: result.insertId });
  } catch (err) {
    console.error('Error SQL:', err);
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
