import cors from 'cors'
import express from 'express'
import morgan from 'morgan'

import authRoutes from './routes/auth.routes.js'
const app = express()

app.get('/', (req, res) => {

    return res.send('<h1>Hola desde el backend</h1>');
});

app.use(cors({
    origin:'http://localhost:5173',
}))
app.use(express.json());
app.use(morgan('dev'))

app.use("/api", authRoutes)

export default app