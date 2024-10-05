import { supabase } from '../supabase/client';

// Función para insertar el usuario en la tabla "profiles"
export const insertUserInDB = async (userData) => {
    try {
        // Verifica si el usuario ya existe
        const { data: existingUser, error: fetchError } = await supabase
            .from('profiles')
            .select('id')
            .eq('id', userData.id);

        if (fetchError) throw fetchError;

        // Si no existe, lo insertas
        if (existingUser.length === 0) {
            const { data, error } = await supabase
                .from('profiles')
                .insert([
                    {
                        id: userData.id,
                        email: userData.email,
                        avatar: userData.avatar,
                        name: userData.name
                    }
                ]);

            if (error) throw error;

            console.log("Usuario insertado en la tabla 'profiles'", data);
        } else {
            console.log("El usuario ya existe en la base de datos.");
        }
    } catch (error) {
        console.error("Error al insertar o verificar el usuario:", error);
    }
};
