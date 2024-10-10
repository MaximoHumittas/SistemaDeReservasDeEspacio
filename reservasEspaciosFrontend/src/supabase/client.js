import { createClient } from '@supabase/supabase-js';

const projectURL = import.meta.env.VITE_SUPABASE_URL; 
const projectKey = import.meta.env.VITE_SUPABASE_KEY; 

export const supabase = createClient(projectURL, projectKey); 

// Función para manejar el inicio de sesión con Google
export const signInWithGoogle = async () => {
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
    });

    if (error) {
      console.error('Error al iniciar sesión con Google:', error.message);
      return { error: error.message };
    }

    const { user } = data;
    if (user) {
      // Una vez que el usuario ha iniciado sesión, lo agregamos a la tabla "usuarios"
      const { data: insertData, error: insertError } = await supabase
        .from('usuarios') // Asegúrate de que este es el nombre correcto de tu tabla
        .insert([{
          id: user.id,
          email: user.email,
          // Aquí puedes añadir más columnas si las tienes en tu tabla
        }]);

      if (insertError) {
        console.error('Error al insertar el usuario en la tabla personalizada:', insertError.message);
        return { error: insertError.message };
      }

      console.log('Usuario agregado a la tabla personalizada:', insertData);
      return { success: true, data: insertData };
    }
  } catch (error) {
    console.error('Error general en la autenticación con Google:', error);
    return { error: error.message };
  }
}; 