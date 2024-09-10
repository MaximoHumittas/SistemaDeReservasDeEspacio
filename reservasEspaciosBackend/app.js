const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors()); // Permitir CORS para todos los orígenes

app.use(express.json());

app.get('/solicitud', (req, res) => {
    res.json({ message: "Solicitud recibida desde el backend" });
});

// Otros endpoints...

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
