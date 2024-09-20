import { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export const UserContext = createContext();

export function UserProvider({ children }) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            const { data: { user }, error } = await supabase.auth.getUser();
            if (error) {
                console.error('Error al obtener el usuario:', error);
            } else {
                setUser(user);
            }
        };
        fetchUser();
    }, []);

    const login = async (email, password) => {
        const { data: { user }, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw new Error(error.message);
        setUser(user);
    };

    const logout = async () => {
        await supabase.auth.signOut();
        setUser(null);
    };

    const updateUser = (newUserData) => {
        setUser((prevUser) => ({
            ...prevUser,
            ...newUserData,
        }));
    };

    return (
        <UserContext.Provider value={{ user, login, logout, updateUser }}>
            {children}
        </UserContext.Provider>
    );
}

UserProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
