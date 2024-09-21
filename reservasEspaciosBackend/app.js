
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

app.post('/agendamiento', async (req, res) => {

    const {tipo_agendamiento,fecha,franja_horaria,agendado} = req.body;
    console.log("Datos recibidos del agendamiento ", {tipo_agendamiento,fecha,franja_horaria,agendado})




    try {
        const { data: dataAgendamiento, error: errorAgendamiento} = await supabase.from('agendamiento').insert([
            {
                tipo_agendamiento,
                fecha,
                franja_horaria,
                agendado
            }

            
             
        ])

        if (errorAgendamiento) {
            console.error('Error al registrar en tabla agendamiento:', errorAgendamiento);
            return res.status(400).json({ error: errorAgendamiento.message });
        }


        console.log('Fecha Agendada correctamente:', dataAgendamiento);

        
        
        console.log("Inicio de registrar en la tabla de horarios")

        //se creo un id de horarios y id de recurso, nose como se hara pero es un ejemplo de como se llenaria la tabla
        const idHorarios = 2
        const idRecursos = 4

        //formateo el dia de la fecha
        const dia =   parseInt(dayjs(fecha).format('DD'), 10);
        const fechas= franja_horaria.split('-')
        const hora_inicio =  fechas[0]
        const hora_fin = fechas[1]

        console.log(dia,hora_inicio,hora_fin)

        const {data: dataHorario, error: errorHorario} = await supabase.from('horarios').insert([
            {
                id: idHorarios,
                dia:fecha,
                hora_inicio,
                hora_fin
            }
        ])

        if (errorHorario) {
            console.log('Resultado de la inserción en agendamiento:', dataAgendamiento, errorAgendamiento);

            console.error('Error en registrar en tabla horarios:', errorHorario.message);
            console.log('Intentando insertar:', { dia, hora_inicio, hora_fin }); 
            return res.status(400).json({ error: errorHorario.message });
            
        }

        console.log('Resultado de la inserción en agendamiento:', dataAgendamiento, errorAgendamiento);
        return res.status(201).json({ message: 'Fecha Agendada correctamente', dataAgendamiento, dataHorario });



    } catch (error) {
        console.log("Error en hacer el agendamiento", error);
        return res.status(500).json({error: "Error interno del servidor"})


    }




 })




app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
