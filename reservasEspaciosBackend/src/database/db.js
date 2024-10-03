import { createClient } from '@supabase/supabase-js';
import 'dotenv/config';
import express from 'express';

const app = express();
app.use(express.json());

// Conectar a Supabase
export const connectSupabase = () => {
    try {
        const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
        console.log("Conectado a Supabase");
        return supabase;
    } catch (error) {
        console.log(error);
    }
};

// Verificar la disponibilidad de un horario
const verificarDisponibilidad = async (horario_id) => {
    const supabase = connectSupabase();
    const { data, error } = await supabase
        .from('reservas')
        .select('*')
        .eq('horario_id', horario_id);

    if (error) {
        console.error('Error al verificar disponibilidad:', error);
        return false;
    }

    return data.length === 0; // Devuelve true si no hay reservas para el horario
};

// Realizar una reserva
const realizarReserva = async (usuario_id, horario_id) => {
    const supabase = connectSupabase();

    // Verificar si el horario está disponible
    const disponible = await verificarDisponibilidad(horario_id);
    if (!disponible) {
        return 'El horario no está disponible';
    }

    // Insertar la nueva reserva en la tabla 'reservas'
    const { data, error } = await supabase
        .from('reservas')
        .insert([{ usuario_id, horario_id }]);

    if (error) {
        console.error('Error al realizar la reserva:', error);
        return 'Error al realizar la reserva';
    }

    return 'Reserva realizada con éxito';
};

// Endpoint para realizar reservas
app.post('/api/reservas', async (req, res) => {
    const { usuario_id, horario_id } = req.body;
    
    // Llamar a la función para realizar la reserva
    const mensaje = await realizarReserva(usuario_id, horario_id);
    res.json({ message: mensaje });
});

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});