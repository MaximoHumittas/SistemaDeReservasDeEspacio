import { connectSupabase } from '../database/db.js';

const supabase = connectSupabase();

export const reserve = async (req, res) => {
    console.log("Reserva desde auth controller");
    const { date, resourceId, hour } = req.params;
    console.log(date, resourceId, hour);
    const [hora_inicio, hora_fin] = hour.split(" - ");
    console.log(hora_inicio, hora_fin);
    
    let nuevoHorarioId = 0;
    
    try {
        const { data: dataHorary, error: errorHorary } = await supabase
            .from('horarios')
            .insert([
                {
                    recurso_id: resourceId,
                    hora_inicio,
                    hora_fin,
                    fecha: date
                }
            ]);
        
        if (errorHorary) {
            console.log(errorHorary);
            console.log("Error con el horario");
        }
    } catch (error) {
        console.log("Error intentando hacer el horario");
        console.log(error);
    }

    try {
        const { data: dataHoraryId, error: errorHoraryId } = await supabase
            .from('horarios')
            .select('id')
            .eq('hora_inicio', hora_inicio)
            .eq('hora_fin', hora_fin)
            .eq('fecha', date)
            .single();

        if (errorHoraryId) {
            console.log("Error en conseguir el id de horario");
            return res.status(500).json({ error: "Error al obtener el id del horario" });
        }

        nuevoHorarioId = dataHoraryId.id;

    } catch (error) {
        console.log("Error intentando obtener el horario");
        console.log(error);
    }

    const { data: dataReserva, error: errorReserva } = await supabase.from('reservas').insert([
        {
            usuario_id: 21,
            horario_id: nuevoHorarioId
        }    
    ]);

    if (errorReserva) {
        console.error('Error al registrar la reserva:', errorReserva);
        return res.status(400).json({ error: errorReserva.message });
    }

    console.log('Fecha Agendada correctamente:', dataReserva); 
};

export const login = (req, res) => res.send("Login");

export const getResource = async (req, res) => {
    const { resourceType } = req.params;

    console.log("Auth controllers ", resourceType);

    try {
        const { data: dataResource, error: errorResource } = await supabase
            .from('recursos_reservables')
            .select('id')
            .eq('tipo', resourceType);

        if (errorResource) {
            console.log("Error en conseguir los datos");
            return res.status(500).json({ error: "Error al obtener el recurso" });
        }

        return res.status(200).json(dataResource);

    } catch (error) {
        console.error("Error en el servidor: ", error);
        return res.status(500).json({ error: "Error del servidor" });
    }
};

export const getHorary = async (req, res) => {
    const { id, date } = req.params;
    console.log("Id: ", id);
    console.log("fecha: ", date);

    try {
        const { data: dataHorary, error: errorHorary } = await supabase
            .from('horarios')
            .select('*')
            .eq('recurso_id', id)
            .eq('fecha', date);

        if (errorHorary) {
            console.log("Error en conseguir los horarios");
            return res.status(500).json({ error: "Error en obtener los horarios" });
        }

        console.log("horas ocupadas: ", dataHorary);
        return res.status(200).json(dataHorary);

    } catch (error) {
        console.error("Error en intentar obtener los horarios");
        return res.status(500).json({ error: "Error en intentar obtener los horarios" });
    }
};

export const register = async (req, res) => {
    const { email, googleId } = req.body; // Asegúrate de obtener estos datos después de la autenticación

    try {
        // Verificar si el usuario ya existe en la tabla de usuarios
        const { data: existingUser, error: existingUserError } = await supabase
            .from('usuarios')
            .select('*')
            .eq('email', email)
            .single();

        // Si no existe, insertar el nuevo usuario
        if (!existingUser) {
            const { data: userData, error: userError } = await supabase
                .from('usuarios')
                .insert([{ id: googleId, email, passwd: null }]); // Usa null o un valor por defecto para passwd

            if (userError) {
                return res.status(390).json({ error: userError.message });
            }
        }

        // Insertar en la segunda tabla
        const { data: additionalData, error: additionalError } = await supabase
            .from('your_public_table') // Cambia esto por el nombre de tu tabla pública
            .insert([{ email }]); // Ajusta los campos según tu estructura de tabla

        if (additionalError) {
            return res.status(390).json({ error: additionalError.message });
        }

        return res.status(201).json({ message: "Usuario registrado correctamente en ambas tablas", userData, additionalData });
    } catch (error) {
        console.error("Error en el registro:", error);
        return res.status(500).json({ error: "Error en el servidor" });
    }
};