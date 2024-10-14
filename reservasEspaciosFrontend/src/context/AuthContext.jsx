import { createContext, useEffect, useState } from "react";
import { supabase } from "../supabase/client";

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
        console.log("Session found:", session); 
        setUser({
          id: session.user.id,
          email: session.user.email,
          avatar: session.user.user_metadata.avatar_url,
          name: session.user.user_metadata.name,
        });
      } else {
        console.log("No session found");
      }
    };

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("Auth state changed:", event, session); // Log del cambio de estado de autenticación
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
      console.log("Login con Google exitoso");
    } catch (error) {
      console.error("Error en loginWithGoogle:", error);
    }
  };

  const loginGeneric = async (userEmail, userPassword) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email: userEmail, password: userPassword });
      if (error) throw new Error(error.message);
      setUser({
        id: data.user.id,
        email: data.user.email,
        avatar: data.user.user_metadata?.avatar_url,
        name: data.user.email.split('@')[0],
      });
      return data.user;
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      return null;
    }
  };

  const registerUser = async (email, password) => {
    try {
      const { data, error: signUpError } = await supabase.auth.signUp({ email, password });
      if (signUpError) throw new Error(signUpError.message);

      const user = data.user;

      const { error: insertError } = await supabase.from("usuarios").insert([{ email: user.email, passwd: password }]);
      if (insertError) throw new Error(insertError.message);

      setUser({
        id: user.id,
        email: user.email,
        avatar: user.user_metadata?.avatar_url,
        name: email.split('@')[0],
      });

      return user;
    } catch (error) {
      console.error("Error al registrarse:", error);
    }
  };

  const logout = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loginWithGoogle, loginGeneric, registerUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;