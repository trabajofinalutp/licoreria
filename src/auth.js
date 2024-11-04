// auth.js
const jwt = require('jsonwebtoken');
const secret = 'tu_secreto_aqui'; // Cambia esto a una variable de entorno

// Middleware para verificar el token
const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(403).json({ message: 'No token provided.' });
    }

    jwt.verify(token, secret, (err, decoded) => {
        if (err) {
            return res.status(500).json({ message: 'Failed to authenticate token.' });
        }
        req.userId = decoded.id; // Almacena el id del usuario en la solicitud
        next();
    });
};

module.exports = {
    verifyToken,
};
