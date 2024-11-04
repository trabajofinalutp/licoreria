const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Conexión a la base de datos
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'licoreriadb'
});

db.connect((err) => {
    if (err) {
        console.error('Error conectando a la base de datos: ', err);
        return;
    }
    console.log('Conectado a la base de datos MySQL');
});

// Endpoints para Usuarios
app.get('/api/usuarios', (req, res) => {
    const query = 'SELECT * FROM Usuarios';
    db.query(query, (err, results) => {
        if (err) return res.status(500).json({ error: 'Error al obtener usuarios' });
        res.status(200).json(results);
    });
});

app.post('/api/usuarios', (req, res) => {
    const { nombre, correo, telefono, rol, activo = 1 } = req.body;
    const query = 'INSERT INTO Usuarios (nombre, correo, telefono, rol, activo) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [nombre, correo, telefono, rol, activo], (err, result) => {
        if (err) return res.status(500).json({ error: 'Error al agregar usuario' });
        res.status(201).json({ id_usuario: result.insertId, nombre, correo, telefono, rol, activo });
    });
});

app.put('/api/usuarios/:id', (req, res) => {
    const { id } = req.params;
    const { nombre, correo, telefono, rol, activo } = req.body;
    const query = 'UPDATE Usuarios SET nombre = ?, correo = ?, telefono = ?, rol = ?, activo = ? WHERE id_usuario = ?';
    db.query(query, [nombre, correo, telefono, rol, activo, id], (err, result) => {
        if (err) return res.status(500).json({ error: 'Error al actualizar usuario' });
        if (result.affectedRows === 0) return res.status(404).json({ error: 'Usuario no encontrado' });
        res.status(200).json({ id_usuario: id, nombre, correo, telefono, rol, activo });
    });
});

app.delete('/api/usuarios/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM Usuarios WHERE id_usuario = ?';
    db.query(query, [id], (err, result) => {
        if (err) return res.status(500).json({ error: 'Error al eliminar usuario' });
        if (result.affectedRows === 0) return res.status(404).json({ error: 'Usuario no encontrado' });
        res.status(204).send();
    });
});

// Endpoints para Productos
app.get('/api/productos', (req, res) => {
    db.query('SELECT * FROM Productos', (err, results) => {
        if (err) return res.status(500).json({ error: 'Error al obtener productos' });
        res.json(results);
    });
});

app.post('/api/productos', (req, res) => {
    const { nombre, descripcion, precio, stock, categoria } = req.body;
    const query = 'INSERT INTO Productos (nombre, descripcion, precio, stock, categoria) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [nombre, descripcion, precio, stock, categoria], (err, result) => {
        if (err) return res.status(500).json({ error: 'Error al agregar producto' });
        res.status(201).json({ id_producto: result.insertId, nombre, descripcion, precio, stock, categoria });
    });
});

// Endpoints para Proveedores
app.get('/api/proveedores', (req, res) => {
    db.query('SELECT * FROM Proveedores', (err, results) => {
        if (err) return res.status(500).json({ error: 'Error al obtener proveedores' });
        res.json(results);
    });
});

app.post('/api/proveedores', (req, res) => {
    const { nombre, correo, telefono, direccion } = req.body;
    const query = 'INSERT INTO Proveedores (nombre, correo, telefono, direccion) VALUES (?, ?, ?, ?)';
    db.query(query, [nombre, correo, telefono, direccion], (err, result) => {
        if (err) return res.status(500).json({ error: 'Error al agregar proveedor' });
        res.status(201).json({ id_proveedor: result.insertId, nombre, correo, telefono, direccion });
    });
});

// Endpoints para Ventas
app.get('/api/ventas', (req, res) => {
    db.query('SELECT * FROM Ventas', (err, results) => {
        if (err) return res.status(500).json({ error: 'Error al obtener ventas' });
        res.json(results);
    });
});

app.post('/api/ventas', (req, res) => {
    const { total, metodo_pago } = req.body;
    const query = 'INSERT INTO Ventas (total, metodo_pago) VALUES (?, ?)';
    db.query(query, [total, metodo_pago], (err, result) => {
        if (err) return res.status(500).json({ error: 'Error al agregar venta' });
        res.status(201).json({ id_venta: result.insertId, total, metodo_pago });
    });
});

// Endpoints para Detalle_Venta
app.post('/api/detalle_venta', (req, res) => {
    const { id_venta, id_producto, cantidad, precio_unitario } = req.body;
    const subtotal = cantidad * precio_unitario;
    const query = 'INSERT INTO Detalle_Venta (id_venta, id_producto, cantidad, precio_unitario, subtotal) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [id_venta, id_producto, cantidad, precio_unitario, subtotal], (err) => {
        if (err) return res.status(500).json({ error: 'Error al agregar detalle de venta' });
        res.status(201).json({ id_venta, id_producto, cantidad, precio_unitario, subtotal });
    });
});

// Endpoints para Ingresos
app.get('/api/ingresos', (req, res) => {
    db.query('SELECT * FROM Ingresos', (err, results) => {
        if (err) return res.status(500).json({ error: 'Error al obtener ingresos' });
        res.json(results);
    });
});

app.post('/api/ingresos', (req, res) => {
    const { descripcion, monto } = req.body;
    const query = 'INSERT INTO Ingresos (descripcion, monto) VALUES (?, ?)';
    db.query(query, [descripcion, monto], (err, result) => {
        if (err) return res.status(500).json({ error: 'Error al agregar ingreso' });
        res.status(201).json({ id_ingreso: result.insertId, descripcion, monto });
    });
});

// Endpoints para Egresos
app.get('/api/egresos', (req, res) => {
    db.query('SELECT * FROM Egresos', (err, results) => {
        if (err) return res.status(500).json({ error: 'Error al obtener egresos' });
        res.json(results);
    });
});

app.post('/api/egresos', (req, res) => {
    const { descripcion, monto } = req.body;
    const query = 'INSERT INTO Egresos (descripcion, monto) VALUES (?, ?)';
    db.query(query, [descripcion, monto], (err, result) => {
        if (err) return res.status(500).json({ error: 'Error al agregar egreso' });
        res.status(201).json({ id_egreso: result.insertId, descripcion, monto });
    });
});

// Inicio del servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
