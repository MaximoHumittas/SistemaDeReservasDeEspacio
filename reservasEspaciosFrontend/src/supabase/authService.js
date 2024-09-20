import { supabase } from './supabase/supabaseClient';

export const ROLES = {
    ESTUDIANTE: 'estudiante',
    DOCENTE: 'docente',
    ADMINISTRATIVO: 'administrativo'
};

export const AuthService = {
    currentUser: null,

    login: async (email, password) => {
        const { data: user, error } = await supabase.auth.signInWithPassword({
            email,
            password
        });

        if (error) throw new Error(error.message);
        AuthService.currentUser = user;
        localStorage.setItem('user', JSON.stringify(AuthService.currentUser));
    },

    logout: async () => {
        await supabase.auth.signOut();
        AuthService.currentUser = null;
        localStorage.removeItem('user');
    },

    getCurrentUser: () => {
        if (!AuthService.currentUser) {
            const storedUser = localStorage.getItem('user');
            AuthService.currentUser = storedUser ? JSON.parse(storedUser) : null;
        }
        return AuthService.currentUser;
    },

    isAuthenticated: () => !!AuthService.getCurrentUser(),

    getUserRole: () => {
        const user = AuthService.getCurrentUser();
        return user ? user.tipoUsuario : null;
    }
};
