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
        console.log("Session found:", session); // Log de sesión encontrada
        setUser({
          id: session.user.id,
          email: session.user.email,
          avatar: session.user.user_metadata.avatar_url,
          name: session.user.user_metadata.name,
        });
      } else {
        console.log("No session found"); // Log cuando no hay sesión
      }
    };

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        console.log("Auth state changed, session:", session); // Log del cambio de estado de autenticación
        setUser({
          id: session.user.id,
          email: session.user.email,
          avatar: session.user.user_metadata.avatar_url,
          name: session.user.user_metadata.name,
        });
      } else {
        console.log("User logged out"); // Log cuando el usuario cierra sesión
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
      if (error) {
        console.error("Error al hacer login con Google:", error); // Log de error
        throw new Error("Error al hacer login con Google");
      }
      console.log("Login con Google exitoso"); // Log de éxito
    } catch (error) {
      console.error("Error en loginWithGoogle:", error); // Log de captura de error
    }
  };

  const loginGeneric = async (userEmail, userPassword) => {
    try {
      console.log("Iniciando sesión con:", { userEmail, userPassword }); // Log de inicio de sesión genérico

      const { data, error } = await supabase.auth.signInWithPassword({
        email: userEmail,
        password: userPassword,
      });

      if (error) {
        console.error("Error con el login generico:", error.message); // Log de error
        return null;
      }

      if (!data || !data.user) {
        console.alert("Usuario no encontrado. Verifica las credenciales."); // Alerta si no se encuentra el usuario
        return null;
      }

      console.log("Usuario encontrado:", data.user); // Log del usuario encontrado

      setUser({
        id: data.user.id,
        email: data.user.email,
        avatar: data.user.user_metadata?.avatar_url,
        name: data.user.email.split('@')[0],
      });

      return data.user;

    } catch (error) {
      console.error("Error al iniciar el login generico:", error); // Log de captura de error
      return null; 
    }
  };

  const registerUser = async (email, password) => {
    console.log("Intentando registrar usuario:", email); // Log de registro
    try {
      const { data, error: signUpError } = await supabase.auth.signUp({ email, password });

      if (signUpError) {
        console.error("Error al registrar usuario:", signUpError.message); // Log de error
        return null;
      }

      if (!data || !data.user) {
        console.log("Usuario no registrado correctamente. Verifica la respuesta."); // Log de verificación
        return null;
      }

      const user = data.user;

      // Inserción en la tabla "usuarios"
      const { error: insertError } = await supabase.from("usuarios").insert([{ email: user.email, passwd: password }]);
      
      if (insertError) {
        console.error("Error al insertar en la tabla usuarios:", insertError.message); // Log de error
        return null;
      }

      console.log("Usuario registrado correctamente:", user); // Log de éxito

      setUser({
        id: user.id,
        email: user.email,
        avatar: user.user_metadata?.avatar_url,
        name: email.split('@')[0],
      });

      return data.user;

    } catch (error) {
      console.error("Error general al registrarse:", error); // Log de captura de error
    }
  };

  const logout = async () => {
    try {
      await supabase.auth.signOut();
      console.log("Usuario desconectado"); // Log de desconexión
      setUser(null);
    } catch (error) {
      console.error("Error al cerrar sesión:", error); // Log de error
    }
  };

  return (
    <AuthContext.Provider value={{ user, loginWithGoogle, loginGeneric, registerUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;