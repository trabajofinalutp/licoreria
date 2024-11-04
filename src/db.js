const mysql = require('mysql');

// Configuración de la conexión a la base de datos
const db = mysql.createConnection({
    host: 'localhost',         // Cambia esto si tu base de datos está en otro servidor
    user: 'root',        // Cambia esto por tu usuario de MySQL
    password: '', // Cambia esto por tu contraseña de MySQL
    database: 'licoreriadb',   // Nombre de tu base de datos
});

// Conectar a la base de datos
db.connect((err) => {
    if (err) {
        console.error('Error de conexión: ' + err.stack);
        return;
    }
    console.log('Conectado a la base de datos MySQL como id ' + db.threadId);
});

// Exportar la conexión para usarla en otros archivos
module.exports = db;
