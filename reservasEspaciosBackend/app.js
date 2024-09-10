const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors()); // Permitir CORS para todos los orígenes
app.use(express.json()); // Para poder recibir datos en formato JSON

app.get('/', (req, res) => {
    res.send('<h1>Bienvenido al Backend</h1>');
});

app.post('/registro', (req, res) => {
    const { email, password, tipoUsuario } = req.body;
    console.log('Datos recibidos para registro:', { email, password, tipoUsuario });

    // AQUI SE PUEDE AGREGAR LA LOGICA PARA GUARDAR EN LA BASE DE DATOS / FIREBASE

    res.json({ message: 'Registro recibido' });
});

// Ruta para manejar otras solicitudes (opcional)
app.get('/', (req, res) => {
    res.send('Bienvenido al backend');
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
