// Importar dependencias
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv'; // Importar dotenv para cargar variables de entorno

// Cargar variables de entorno desde .env
dotenv.config();

// Crear la app de Express
const app = express();
const port = process.env.PORT || 3000; // Usar el puerto desde .env si está disponible

// Importar rutas y base de datos
import supabase from './db.js'; // Ajusta la exportación en db.js si es necesario
//import authRoutes from './routes/auth.routes.js';
import apiRoutes from './routes/api.routes.js';

// Middleware
app.use(cors()); // Habilitar CORS
app.use(express.json()); // Parsear JSON

// Rutas
app.use('/api', apiRoutes); // Rutas para la API
//app.use('/auth', authRoutes); // Rutas de autenticación

// Ruta raíz
app.get('/', (req, res) => {
    res.send('<h1>Backend funcionando correctamente</h1>');
});

// Iniciar servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
