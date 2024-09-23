
const dayjs = require('dayjs')
const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');
const app = express();
const port = 3000;
require('dotenv').config();
const supabase = require('./db');



app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('<h1>Bienvenido al Backend</h1>');
});

app.post('/registro', async (req, res) => {
    const { email, password, tipoUsuario } = req.body;
    console.log('Datos recibidos para registro:', { email, password, tipoUsuario });

    try {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            user_metadata: { tipoUsuario }
        });

        if (error) {
            console.error('Error al registrar:', error);
            return res.status(400).json({ error: error.message });
        }

        const { data: insertData, error: insertError } = await supabase
            .from('estudiantes')
            .insert([{ email, password }])
            .select();

        if (insertError) {
            console.error('error en insertar los usuarios en la tabla:', insertError);
            return res.status(400).json({ error: insertError.message });
        }




        console.log('Usuario registrado correctamente:', data);
        
        return res.status(201).json({ message: 'Usuario registrado exitosamente', data });


    } catch (error) {
        console.error('Error al registrar usuario:', error);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
});


{/* LOGIN POST */}

app.post('/login', async (req, res) => {

    const {email,password, tipoUsuario} = req.body;
    console.log('Datos recibidos para el login', {email,password,tipoUsuario})

    try {
        const {data, error} = await supabase.auth.signInWithPassword({
            email,
            password,
            user_metadata : {tipoUsuario}
        })

        if (error) {
            console.log('Error en el login', error)
            return res.status(400).json({error:error.message})
        }

        console.log("Login hecho correctamente", data)
        return res.status(201).json({message:"Usuario logeado correctamente", data})


    } catch (error) {
        console.log("Error en hacer login", error);
        return res.status(500).json({error: "Error interno del servidor"})
    }


});

app.post('/reserva', async (req, res) => {

    const {usuario_id,hora_inicio,hora_fin,recurso_id,fecha} = req.body;
    console.log("Datos recibidos para la reserva ", {usuario_id,hora_inicio,hora_fin,recurso_id,fecha})


    console.log("Comenzando la reserva")

    try {


        const {data: dataHorario, error: errorHorario} = await supabase.from('horarios').insert([
            {
                recurso_id,
                hora_inicio,
                hora_fin,
                fecha

            }
        ])

        if (errorHorario) {
            console.log('Error al registrar el horario', errorHorario)
            return res.status(400).json({error: errorHorario.message})
            
        }
        console.log("Horario registrado correctamente", dataHorario)

        
        const { data: dataHorarioId, error: errorHorarioId } = await supabase
            .from('horarios')
            .select('id')
            .eq('recurso_id', recurso_id)
            .eq('hora_inicio', hora_inicio)
            .eq('hora_fin', hora_fin)
            .eq('fecha', fecha)
            .single();

        if (errorHorarioId) {
            console.log('Error en tener el id del horario', errorHorarioId);
            return res.status(400).json({ error: errorHorarioId.message });
        }

        const nuevoHorarioId = dataHorarioId.id;
        console.log("ID del nuevo horario:", nuevoHorarioId);


        const { data: dataReserva, error: errorReserva} = await supabase.from('reservas').insert([
            {
                usuario_id,
                horario_id:nuevoHorarioId
                
            }    
        ])

        if (errorReserva) {
            console.error('Error al registrar la reserva:', errorReserva);
            return res.status(400).json({ error: errorReserva.message });
        }

        console.log('Fecha Agendada correctamente:', dataReserva);

        


    } catch (error) {
        console.log("Error en hacer el agendamiento y el horario", error);
        return res.status(500).json({error: "Error interno del servidor"})


    }


 })

 app.post('/recurso', async (req, res) => {

    const {tipo,nombre} = req.body;
    console.log("Datos recibidos del recurso ", {tipo,nombre})

    try {
        const {data: dataRecurso, error: errorRecurso} = await supabase.from('recursos_reservables').insert([
            {
                tipo,
                nombre

            }
        ])

        if (errorRecurso) {
            console.log("Error en insertar en tabla de recursos reservables", errorRecurso.message)
            return res.status(400).json({error: errorRecurso.message}) 
        }

        console.log('Insertado correctamente en la tabla recursos', dataRecurso)

        
    } catch (error) {
        console.log("Error en hacer la insercion", error)
        return res.status(500).json({error: "Error interno en el servidor"})
        
    }



 })


 app.get('/ObtenerHorario', async (req,res) => {
    const {recurso_id,date} = req.query;

    console.log("Consulta al obtener las horas de recurso ", recurso_id, "fecha", date)

    try {
        const {data: dataObtenerHorario, error: errorObtenerHorario} = await supabase

        .from('horarios')
        .select('id,hora_inicio,hora_fin')
        .eq('recurso_id',recurso_id)
        .eq('fecha',date)


        if (errorObtenerHorario) {
            console.log("Error en obtener horario: ", errorObtenerHorario)
            return res.status(400).json({error: errorObtenerHorario})
        }

        console.log("Horarios obtenidos ", dataObtenerHorario)
        res.status(200).json(dataObtenerHorario)
        

    } catch (error) {
        console.log("Error al intentar obtener los horarios")
        res.status(500).json({error: "Error en obtener los horarios"})
    }
    
 })


 app.get('/obtenerRecurso', async (req,res) => {
    const {type} = req.query

    console.log("Consulta de obtener recurso ,", type)

    try {

        const {data: dataObtenerRecurso, error: errorObtenerRecuso} = await supabase
        .from('recursos_reservables')
        .select('id')
        .eq('tipo', type)
        
        if (errorObtenerRecuso) {
            return res.status(400).json({error: errorObtenerRecuso.message})
        }
        
        res.status(200).json(dataObtenerRecurso)

    } catch (error) {

        res.status(500).json({error: 'Error en obtener el tipo de recuso'})
        
    }
 })




app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
