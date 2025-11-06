CREATE DATABASE iso_tool;
USE iso_tool;

CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    rol ENUM('admin', 'auditor', 'user') NOT NULL
);

INSERT INTO usuarios (username, password_hash, rol)
VALUES ('admin', SHA2('password', 256), 'admin');

CREATE TABLE registro9001 (
    id INT AUTO_INCREMENT PRIMARY KEY,
    razon_social VARCHAR(150) NOT NULL,
    nit VARCHAR(30) NOT NULL UNIQUE,
    representante_legal VARCHAR(120) NOT NULL,
    sector_economico VARCHAR(120) NOT NULL,
    tipo_empresa VARCHAR(100) NOT NULL,
    direccion VARCHAR(200),
    telefono VARCHAR(30),
    numero_empleados INT,
    email VARCHAR(120),
    sitio_web VARCHAR(200),
    facebook VARCHAR(200),
    instagram VARCHAR(200),
    tiktok VARCHAR(200),
    creado_por INT NOT NULL,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (creado_por) REFERENCES usuarios(id)
);

CREATE TABLE registro27001 (
    id INT AUTO_INCREMENT PRIMARY KEY,
    razon_social VARCHAR(150) NOT NULL,
    nit VARCHAR(30) NOT NULL UNIQUE,
    representante_legal VARCHAR(120) NOT NULL,
    sector_economico VARCHAR(120) NOT NULL,
    tipo_empresa VARCHAR(100) NOT NULL,
    direccion VARCHAR(200),
    telefono VARCHAR(30),
    numero_empleados INT,
    email VARCHAR(120),
    sitio_web VARCHAR(200),
    facebook VARCHAR(200),
    instagram VARCHAR(200),
    tiktok VARCHAR(200),
    creado_por INT NOT NULL,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (creado_por) REFERENCES usuarios(id)
);

SHOW TABLES;

select * from usuarios;
select * from registro9001;
select * from registro27001;
