const express = require('express');
const router = express.Router();
const db = require('./db'); // Importa la conexión a la base de datos
const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');

// Función para manejar errores de consultas
function handleQueryError(res, err, message) {
    console.error(err);
    res.status(500).json({ error: message });
}

// Validación de datos
const validateProduct = [
    body('nombre').notEmpty().withMessage('El nombre es requerido'),
    body('precio').isFloat({ gt: 0 }).withMessage('El precio debe ser mayor a 0'),
    body('stock').isInt({ gt: -1 }).withMessage('El stock debe ser un número no negativo'),
    body('categoria').optional().isString(),
];

const validateProvider = [
    body('nombre').notEmpty().withMessage('El nombre es requerido'),
    body('correo').isEmail().withMessage('Correo electrónico inválido'),
    body('telefono').optional().isString(),
    body('direccion').optional().isString()
];

const validateUser = [
    body('nombre').notEmpty().withMessage('El nombre es requerido'),
    body('correo').isEmail().withMessage('Correo electrónico inválido'),
    body('telefono').optional().isString(),
    body('rol').optional().isString(),
];

// Rutas para Productos
router.get('/productos', (req, res) => {
    db.query('SELECT * FROM Productos', (err, results) => {
        if (err) return handleQueryError(res, err, 'Error al obtener productos');
        res.json(results);
    });
});

router.post('/productos', validateProduct, (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { nombre, descripcion, precio, stock, categoria } = req.body;
    const nuevoProducto = { nombre, descripcion, precio, stock, categoria };

    db.query('INSERT INTO Productos SET ?', nuevoProducto, (err) => {
        if (err) return handleQueryError(res, err, 'Error al agregar producto');
        res.status(201).json({ message: 'Producto agregado con éxito' });
    });
});

// Rutas para Proveedores
router.get('/proveedores', (req, res) => {
    db.query('SELECT * FROM Proveedores', (err, results) => {
        if (err) return handleQueryError(res, err, 'Error al obtener proveedores');
        res.json(results);
    });
});

router.post('/proveedores', validateProvider, (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { nombre, correo, telefono, direccion } = req.body;
    const nuevoProveedor = { nombre, correo, telefono, direccion };

    db.query('INSERT INTO Proveedores SET ?', nuevoProveedor, (err) => {
        if (err) return handleQueryError(res, err, 'Error al agregar proveedor');
        res.status(201).json({ message: 'Proveedor agregado con éxito' });
    });
});

// Rutas para Ventas
router.get('/ventas', (req, res) => {
    db.query('SELECT * FROM Ventas', (err, results) => {
        if (err) return handleQueryError(res, err, 'Error al obtener ventas');
        res.json(results);
    });
});

router.post('/ventas', [
    body('total').isFloat({ gt: 0 }).withMessage('El total debe ser mayor a 0'),
    body('metodo_pago').notEmpty().withMessage('El método de pago es requerido')
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { total, metodo_pago } = req.body;
    const nuevaVenta = { total, metodo_pago };

    db.query('INSERT INTO Ventas SET ?', nuevaVenta, (err, result) => {
        if (err) return handleQueryError(res, err, 'Error al agregar venta');
        res.status(201).json({ message: 'Venta agregada con éxito', id_venta: result.insertId });
    });
});

// Rutas para Detalle de Venta
router.post('/detalle_venta', [
    body('id_venta').isInt().withMessage('ID de venta inválido'),
    body('id_producto').isInt().withMessage('ID de producto inválido'),
    body('cantidad').isInt({ gt: 0 }).withMessage('La cantidad debe ser mayor a 0'),
    body('precio_unitario').isFloat({ gt: 0 }).withMessage('El precio unitario debe ser mayor a 0')
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { id_venta, id_producto, cantidad, precio_unitario } = req.body;
    const subtotal = cantidad * precio_unitario;
    const nuevoDetalle = { id_venta, id_producto, cantidad, precio_unitario, subtotal };

    db.query('INSERT INTO Detalle_Venta SET ?', nuevoDetalle, (err) => {
        if (err) return handleQueryError(res, err, 'Error al agregar detalle de venta');
        res.status(201).json({ message: 'Detalle de venta agregado con éxito' });
    });
});

// Rutas para Usuarios
router.get('/usuarios', (req, res) => {
    db.query('SELECT * FROM Usuarios', (err, results) => {
        if (err) return handleQueryError(res, err, 'Error al obtener usuarios');
        res.json(results);
    });
});

router.post('/usuarios', validateUser, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { nombre, correo, telefono, rol } = req.body;
    const nuevoUsuario = { nombre, correo, telefono, rol };

    db.query('INSERT INTO Usuarios SET ?', nuevoUsuario, (err) => {
        if (err) return handleQueryError(res, err, 'Error al agregar usuario');
        res.status(201).json({ message: 'Usuario agregado con éxito' });
    });
});

// Rutas para Ingresos
router.get('/ingresos', (req, res) => {
    db.query('SELECT * FROM Ingresos', (err, results) => {
        if (err) return handleQueryError(res, err, 'Error al obtener ingresos');
        res.json(results);
    });
});

router.post('/ingresos', [
    body('descripcion').notEmpty().withMessage('La descripción es requerida'),
    body('monto').isFloat({ gt: 0 }).withMessage('El monto debe ser mayor a 0')
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { descripcion, monto } = req.body;
    const nuevoIngreso = { descripcion, monto };

    db.query('INSERT INTO Ingresos SET ?', nuevoIngreso, (err) => {
        if (err) return handleQueryError(res, err, 'Error al agregar ingreso');
        res.status(201).json({ message: 'Ingreso agregado con éxito' });
    });
});

// Rutas para Egresos
router.get('/egresos', (req, res) => {
    db.query('SELECT * FROM Egresos', (err, results) => {
        if (err) return handleQueryError(res, err, 'Error al obtener egresos');
        res.json(results);
    });
});

router.post('/egresos', [
    body('descripcion').notEmpty().withMessage('La descripción es requerida'),
    body('monto').isFloat({ gt: 0 }).withMessage('El monto debe ser mayor a 0')
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { descripcion, monto } = req.body;
    const nuevoEgreso = { descripcion, monto };

    db.query('INSERT INTO Egresos SET ?', nuevoEgreso, (err) => {
        if (err) return handleQueryError(res, err, 'Error al agregar egreso');
        res.status(201).json({ message: 'Egreso agregado con éxito' });
    });
});

// Exportar las rutas
module.exports = router;
