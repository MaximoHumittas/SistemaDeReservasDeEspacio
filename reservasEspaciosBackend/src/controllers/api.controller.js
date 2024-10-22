import supabase from '../db.js';

// Función para realizar una reserva
export const haceReserva = async (req, res) => {
    const { usuario_id, recurso_id, fecha, hora_inicio, hora_fin } = req.body;

    try {
        // Verifica si los parámetros son correctos
        if (!usuario_id || !recurso_id || !fecha || !hora_inicio || !hora_fin) {
            return res.status(400).json({ error: 'Datos incompletos para realizar la reserva' });
        }

        // Paso 1: Insertar el horario en la tabla 'horarios'
        const { data: horarioData, error: horarioError } = await supabase
            .from('horarios')
            .insert([{
                recurso_id,
                fecha,
                hora_inicio,
                hora_fin
            }])
            .select(); // Asegúrate de obtener el ID del nuevo horario

        if (horarioError || !horarioData || horarioData.length === 0) {
            console.error('Error al insertar el horario:', horarioError);
            return res.status(400).json({ error: 'Error al insertar el horario' });
        }

        const horario_id = horarioData[0].id;

        // Paso 2: Insertar la reserva en la tabla 'reservas'
        const { data: reservaData, error: reservaError } = await supabase
            .from('reservas')
            .insert([{
                usuario_id,
                horario_id
            }])
            .select(); // Devuelve los datos de la reserva creada

        if (reservaError) {
            console.error('Error al insertar la reserva:', reservaError);
            return res.status(400).json({ error: 'Error al insertar la reserva' });
        }

        return res.status(201).json({ message: 'Reserva realizada con éxito', data: reservaData[0] });

    } catch (error) {
        console.error('hora ocupada  intente otra :', error);
        return res.status(500).json({ error: 'Error interno al realizar la reserva' });
    }
};

// Función para eliminar una reserva
export const eliminarReserva = async (req, res) => {
    const { idReserva } = req.body;

    try {
        // Paso 1: Obtener el horario asociado antes de eliminar la reserva
        const { data: reservaData, error: reservaError } = await supabase
            .from('reservas')
            .select('horario_id')
            .eq('id', idReserva)
            .single();

        if (reservaError || !reservaData) {
            console.error('Error al obtener la reserva:', reservaError);
            return res.status(400).json({ error: 'No se encontró la reserva o hubo un error al obtenerla' });
        }

        const horario_id = reservaData.horario_id;

        // Paso 2: Eliminar la reserva de la tabla 'reservas'
        const { error: deleteReservaError } = await supabase
            .from('reservas')
            .delete()
            .eq('id', idReserva);

        if (deleteReservaError) {
            console.error('Error al eliminar la reserva:', deleteReservaError);
            return res.status(400).json({ error: 'Error al eliminar la reserva de la base de datos' });
        }

        // Paso 3: Eliminar el horario asociado
        const { error: horarioDeleteError } = await supabase
            .from('horarios')
            .delete()
            .eq('id', horario_id);

        if (horarioDeleteError) {
            console.error('Error al eliminar el horario:', horarioDeleteError);
            return res.status(400).json({ error: 'Error al eliminar el horario de la base de datos' });
        }

        return res.status(200).json({ message: 'Reserva y horario eliminados correctamente' });

    } catch (error) {
        console.error('Error al eliminar la reserva:', error);
        return res.status(500).json({ error: 'Error interno al eliminar la reserva' });
    }
};

// Función para crear un recurso (ej: cubículos)
export const haceRecurso = async (req, res) => {
    const { tipo, nombre } = req.body;

    try {
        const { data: dataRecurso, error: errorRecurso } = await supabase.from('recursos_reservables').insert([{
            tipo,
            nombre
        }]);

        if (errorRecurso) {
            return res.status(400).json({ error: errorRecurso.message });
        }

        return res.status(201).json({ message: 'Recurso creado con éxito', data: dataRecurso });

    } catch (error) {
        console.error("Error al crear el recurso", error);
        return res.status(500).json({ error: "Error interno del servidor" });
    }
};

// Obtener horarios de un recurso específico en una fecha dada
export const obtenerHorario = async (req, res) => {
    const { recurso_id, date } = req.query;

    try {
        const { data: dataHorarios, error: errorHorarios } = await supabase
            .from('horarios')
            .select('id, hora_inicio, hora_fin')
            .eq('recurso_id', recurso_id)
            .eq('fecha', date);

        if (errorHorarios) {
            return res.status(400).json({ error: errorHorarios.message });
        }

        return res.status(200).json(dataHorarios);

    } catch (error) {
        console.error("Error al obtener los horarios", error);
        return res.status(500).json({ error: "Error interno del servidor" });
    }
};

// Obtener un recurso por tipo (ej: cubículos, biblioteca)
export const obtenerRecurso = async (req, res) => {
    const { type } = req.query;

    try {
        const { data: dataRecurso, error: errorRecurso } = await supabase
            .from('recursos_reservables')
            .select('id')
            .eq('tipo', type);

        if (errorRecurso) {
            return res.status(400).json({ error: errorRecurso.message });
        }

        return res.status(200).json(dataRecurso);

    } catch (error) {
        console.error("Error al obtener el recurso", error);
        return res.status(500).json({ error: "Error interno del servidor" });
    }
};

// Obtener el ID del usuario por correo electrónico
export const getId = async (req, res) => {
    const { email } = req.params;

    try {
        const { data: dataId, error: errorId } = await supabase
            .from('usuarios')
            .select('id')
            .eq('email', email)
            .single();

        if (errorId) {
            return res.status(500).json({ error: "Error al obtener el ID del usuario" });
        }

        return res.status(200).json(dataId);

    } catch (error) {
        console.error("Error al obtener el ID del usuario", error);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
};
