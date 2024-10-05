import { createContext, useEffect, useState } from "react";
import { supabase } from "../supabase/client";
import bcrypt from "bcryptjs";

export const AuthContext = createContext({
  user: null,
  loginWithGoogle: async () => {},
  loginGeneric: async () => {},
  registerUser: async () => {},
  logout: async () => {},
});

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkUserSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setUser({
          id: session.user.id,
          email: session.user.email,
          avatar: session.user.user_metadata.avatar_url,
          name: session.user.user_metadata.name,
        });
      }
    };

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        setUser({
          id: session.user.id,
          email: session.user.email,
          avatar: session.user.user_metadata.avatar_url,
          name: session.user.user_metadata.name,
        });
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
      const { error } = await supabase.auth.signInWithOAuth({ provider: "google" });
      if (error) throw new Error("Error al hacer login con Google");
    } catch (error) {
      console.error(error);
    }
  };

  const loginGeneric = async (email, password) => {
    try {
      const { error, user } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      setUser(user);
    } catch (error) {
      console.error("Error al iniciar sesión genérico:", error);
    }
  };

  const registerUser = async (email, password) => {
    try {
      const { error: signUpError, user } = await supabase.auth.signUp({ email, password });
      if (signUpError) throw signUpError;

      const hashedPassword = bcrypt.hashSync(password, 10);
      const { error: insertError } = await supabase
        .from("usuarios")
        .insert([{ email, passwd: hashedPassword }]);
      
      if (insertError) throw insertError;

      setUser(user);
    } catch (error) {
      console.error("Error al registrarse y guardar en la tabla usuarios:", error);
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
    <AuthContext.Provider value={{ user, loginWithGoogle, loginGeneric, registerUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
