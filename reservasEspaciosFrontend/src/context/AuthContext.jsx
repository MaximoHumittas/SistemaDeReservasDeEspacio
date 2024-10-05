import { createContext, useEffect, useState } from 'react';
import { supabase } from '../supabase/client';
import { insertUserInDB } from './ImportUID';  // Importa la función para insertar datos en la BD

export const AuthContext = createContext({
    user: null,
    loginWithGoogle: async () => {},
    logout: async () => {}
});

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const checkUserSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();  
            
            if (session) {
                const userData = {
                    id: session.user.id,  // UID correcto
                    email: session.user.email,
                    avatar: session.user.user_metadata.avatar_url,
                    name: session.user.user_metadata.name,
                };

                setUser(userData);

                // Inserta el usuario en la tabla si no existe
                insertUserInDB(userData);
            }
        };

        const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
            if (session) {
                const userData = {
                    id: session.user.id,  // UID correcto
                    email: session.user.email,
                    avatar: session.user.user_metadata.avatar_url,
                    name: session.user.user_metadata.name,
                };

                setUser(userData);

                // Inserta el usuario en la tabla si no existe
                insertUserInDB(userData);
            } else {
                setUser(null);  
            }
        });

        checkUserSession();

        return () => {
            authListener.subscription.unsubscribe();  
        };
    }, []);

    const loginWithGoogle = async () => {
        try {
            const { error } = await supabase.auth.signInWithOAuth({ provider: 'google' });
            if (error) throw new Error("Error al hacer login");
        } catch (error) {
            console.error(error);
        }
    };

    const logout = async () => {
        try {
            await supabase.auth.signOut();
            setUser(null);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <AuthContext.Provider value={{ user, loginWithGoogle, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
