mport { createClient } from '@supabase/supabase-js';

const projectURL = import.meta.env.VITE_SUPABASE_URL;
const projectKey = import.meta.env.VITE_SUPABASE_KEY;

export const supabase = createClient(projectURL, projectKey);

export const signInWithGoogle = async () => {
    try {
        const { user, error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
        });

        if (error) {
            console.error('Error al iniciar sesión con Google:', error.message);
            return { error: error.message };
        }

        // Si el usuario se autenticó correctamente, intenta insertar en la tabla
        console.log('Usuario autenticado:', user); // Verifica los datos del usuario

        const { data: insertData, error: insertError } = await supabase
            .from('usuarios') // Asegúrate de que este sea el nombre correcto de tu tabla
            .insert([
                {
                    id: user.id,                       // ID del usuario autenticado
                    email: user.email,                 // Email del usuario
                    passwd: user.user_metadata.full_name || "Sin nombre", // Nombre completo o un valor por defecto
                },
            ]);

        if (insertError) {
            console.error('Error al insertar el usuario en la tabla personalizada:', insertError.message);
            return { error: insertError.message };
        }

        console.log('Usuario agregado correctamente a la tabla personalizada:', insertData);
        return { success: true, data: insertData };

    } catch (error) {
        console.error('Error general:', error);
        return { error: error.message };
    }
};