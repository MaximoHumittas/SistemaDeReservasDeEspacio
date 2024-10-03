import { createClient } from '@supabase/supabase-js';
const projectURL = import.meta.env.VITE_SUPABASE_URL;
const projectKey = import.meta.env.VITE_SUPABASE_KEY;

export const supabase = createClient(projectURL, projectKey);

export const signUpUser = async (email, password, displayName, tipoUsuario) => {
    try {
        const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
            email,
            password
        });

        if (signUpError) {
            console.error('Error al registrarse:', signUpError.message);
            return { error: signUpError.message };
        }
        const { user } = signUpData;

        const { data: insertData, error: insertError } = await supabase
            .from('nombre_de_tu_tabla_personalizada')
            .insert([
                {
                    id: user.id,
                    email: user.email,
                    display_name: displayName,
                    tipo_usuario: tipoUsuario,
                },
            ]);

        if (insertError) {
            console.error('Error al agregar el usuario a la tabla personalizada:', insertError.message);
            return { error: insertError.message };
        }

        console.log('Usuario registrado y agregado a la tabla personalizada:', insertData);
        return { success: true, data: insertData };
    } catch (error) {
        console.error('Error general:', error);
        return { error: error.message };
    }
};