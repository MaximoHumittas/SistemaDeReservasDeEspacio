import { createClient } from '@supabase/supabase-js';

const projectURL = import.meta.env.VITE_SUPABASE_URL;
const projectKey = import.meta.env.VITE_SUPABASE_KEY;

export const supabase = createClient(projectURL, projectKey);

// Función para iniciar sesión con Google
export const signInWithGoogle = async () => {
    const { user, session, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
            scopes: 'email',
        },
    });

    if (error) {
        console.error('Error al iniciar sesión con Google:', error.message);
        return { error: error.message };
    }

    // Después de iniciar sesión, inserta el usuario en la tabla personalizada
    const { data: insertData, error: insertError } = await supabase
        .from('usuarios')
        .insert([
            {
                id: user.id,
                email: user.email,
                passwd: null, // Si usas Google, no tendrás contraseña
            },
        ]);

    if (insertError) {
        console.error('Error al agregar el usuario a la tabla personalizada:', insertError.message);
        return { error: insertError.message };
    }

    console.log('Usuario registrado y agregado a la tabla personalizada:', insertData);
    return { success: true, user, session };
};