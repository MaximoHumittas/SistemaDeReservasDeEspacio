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




app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
