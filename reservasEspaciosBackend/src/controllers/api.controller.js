import supabase from '../db.js';

export const haceReserva = async (req, res) => {
    const { usuario_id, hora_inicio, fecha } = req.body;
    console.log("Datos recibidos para la reserva", { usuario_id, hora_inicio, fecha });
    console.log("Comenzando la reserva");

    try {
        // Paso 1: Obtener los IDs de los recursos reservados para esa fecha y hora
        const { data: recursosReservados, error: errorReservas } = await supabase
            .from('horarios')
            .select('recurso_id')
            .eq('fecha', fecha)
            .eq('hora_inicio', hora_inicio);

        if (errorReservas) {
            console.error('Error al obtener recursos reservados:', errorReservas);
            return res.status(500).json({ error: "Error al obtener recursos reservados" });
        }

        // Mapear los recursos reservados
        const idsReservados = recursosReservados.map(reserva => reserva.recurso_id);
        console.log('Recursos reservados:', idsReservados);

        // Buscar cubículos disponibles
        let query = supabase.from('recursos_reservables').select('id').limit(1); // Inicializar la consulta
        let recurso_id = null;

        // Si hay recursos reservados, excluimos esos IDs
        if (idsReservados.length > 0) {
            query = query.not('id', 'in', `(${idsReservados.join(',')})`);
        }

        const { data: cubiculosDisponibles, error: disponibilidadError } = await query;

        if (disponibilidadError) {
            console.error('Error al verificar disponibilidad:', disponibilidadError);
            return res.status(500).json({ error: "Error al verificar disponibilidad" });
        }

        if (cubiculosDisponibles.length === 0) {
            console.log('No hay cubículos disponibles en ese horario.');
            return res.status(400).json({ error: 'No hay cubículos disponibles en ese horario.' });
        } else {
            console.log('Cubículo disponible:', cubiculosDisponibles[0]);
            recurso_id = cubiculosDisponibles[0].id;
        }

        // Insertar horario y reserva
        const { data: dataHorario, error: errorHorario } = await supabase.from('horarios').insert([
            {
                recurso_id,
                hora_inicio,
                fecha
            }
        ]);

        if (errorHorario) {
            console.log('Error al registrar el horario', errorHorario);
            return res.status(400).json({ error: errorHorario.message });
        }
        console.log("Horario registrado correctamente", dataHorario);

        const { data: dataHorarioId, error: errorHorarioId } = await supabase
            .from('horarios')
            .select('id')
            .eq('recurso_id', recurso_id)
            .eq('hora_inicio', hora_inicio)
            .eq('fecha', fecha)
            .single();

        if (errorHorarioId) {
            console.log('Error en obtener el id del horario', errorHorarioId);
            return res.status(400).json({ error: errorHorarioId.message });
        }

        const nuevoHorarioId = dataHorarioId.id;
        console.log("ID del nuevo horario:", nuevoHorarioId);

        const { data: dataReserva, error: errorReserva } = await supabase.from('reservas').insert([
            {
                usuario_id,
                horario_id: nuevoHorarioId
            }
        ]);

        if (errorReserva) {
            console.error('Error al registrar la reserva:', errorReserva);
            return res.status(400).json({ error: errorReserva.message });
        }
        console.log('Fecha Agendada correctamente:', dataReserva);
        return res.status(201).json({ message: 'Reserva realizada exitosamente', data: dataReserva });

    } catch (error) {
        console.log("Error en hacer el agendamiento y el horario", error);
        return res.status(500).json({ error: "Error interno del servidor" });
    }
};

export const haceRecurso = async (req, res) => {
    const { tipo, nombre } = req.body;
    console.log("Datos recibidos del recurso ", { tipo, nombre });

    try {
        const { data: dataRecurso, error: errorRecurso } = await supabase.from('recursos_reservables').insert([
            {
                tipo,
                nombre
            }
        ]);

        if (errorRecurso) {
            console.log("Error al insertar en la tabla de recursos reservables", errorRecurso.message);
            return res.status(400).json({ error: errorRecurso.message });
        }

        console.log('Insertado correctamente en la tabla de recursos', dataRecurso);
        return res.status(201).json({ message: 'Recurso creado exitosamente', data: dataRecurso });

    } catch (error) {
        console.log("Error en hacer la inserción", error);
        return res.status(500).json({ error: "Error interno en el servidor" });
    }
};

export const obtenerHorario = async (req, res) => {
    const { recurso_id, date } = req.query;

    console.log("Consulta al obtener las horas de recurso ", recurso_id, "fecha", date);

    try {
        const { data: dataObtenerHorario, error: errorObtenerHorario } = await supabase
            .from('horarios')
            .select('id,hora_inicio,hora_fin')
            .eq('recurso_id', recurso_id)
            .eq('fecha', date);

        if (errorObtenerHorario) {
            console.log("Error en obtener horario: ", errorObtenerHorario);
            return res.status(400).json({ error: errorObtenerHorario });
        }

        console.log("Horarios obtenidos ", dataObtenerHorario);
        return res.status(200).json(dataObtenerHorario);

    } catch (error) {
        console.log("Error al intentar obtener los horarios");
        return res.status(500).json({ error: "Error en obtener los horarios" });
    }
};

export const obtenerRecurso = async (req, res) => {
    const { type } = req.query;

    console.log("Consulta de obtener recurso,", type);

    try {
        const { data: dataObtenerRecurso, error: errorObtenerRecuso } = await supabase
            .from('recursos_reservables')
            .select('id')
            .eq('tipo', type);

        if (errorObtenerRecuso) {
            return res.status(400).json({ error: errorObtenerRecuso.message });
        }

        return res.status(200).json(dataObtenerRecurso);

    } catch (error) {
        return res.status(500).json({ error: 'Error en obtener el tipo de recurso' });
    }
};
