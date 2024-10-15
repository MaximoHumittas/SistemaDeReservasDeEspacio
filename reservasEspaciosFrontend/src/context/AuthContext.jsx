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

  const getRoleByEmail = (email) => {
    if (email.endsWith("alu.uct.cl")) {
      return "estudiante";

    } else if (email.endsWith("uct.cl")) {
      return "docente";

    } else {
      return "test"; 
    }
  };

  useEffect(() => {

    
    const checkUserSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        const provider = session.user.app_metadata.providers[0]
        const userEmail = session.user.email
        const userRole = getRoleByEmail(userEmail.split('@')[1])


        console.log("Provedor de login ", provider)
        console.log("Email ", userEmail)
        console.log("ROle ", userRole)

        if (provider === "google") {
          
          const {data,error} = await supabase
          .from('usuarios')
          .select('email')
          .eq('email',userEmail)
          if (error) {
            console.log("Error en consultar los correos en la tabla de usuarios")
            
          } else if(data.length > 0) {
            console.log("El correo ya existe en la tabla de usuarios ", data)
          } else {
            console.log("EL correo no esta ", data)
            
            const { error: insertError } = await supabase
            .from('usuarios')
            .insert([{ 
              email: userEmail,
              role: userRole
            
            }]); 
            if (insertError) {
              console.error("Error al insertar el usuario:", insertError.message);
            } else {
              console.log("Nuevo usuario insertado correctamente en la tabla 'usuarios'.");
            }


          }


        }

        
        setUser({
          id: session.user.id,
          email: session.user.email,
          avatar: session.user.user_metadata.avatar_url,
          name: session.user.user_metadata.name,
          role: userRole
        });
      }


    };

    const { data: authListener } = supabase.auth.onAuthStateChange( async (event, session) => {
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
      const { data, error } = await supabase.auth.signInWithOAuth({

         provider: "google" 
        
        });

      if (error) throw new Error("Error al hacer login con Google");
      console.log("Login con google, con exito")
    } catch (error) {
      console.error(error);
    }
  };


  const loginGeneric = async (userEmail, userPassword) => {


    try {
        console.log("Iniciando sesión con:", { userEmail, userPassword });



        const { data, error } = await supabase.auth.signInWithPassword({
            email: userEmail,
            password: userPassword
        });


        if (error) {
            console.error("Error con el login generico:", error.message);
            return null;
        }

        if (!data || !data.user) {
            console.alert("Usuario no encontrado. verificacion de las credenciales.");
            return null;



        }

        console.log("Data ,",  data)
        console.log("Data ,",  data.user.email)
        const email = data.user.email
        
        const userRole = getRoleByEmail(email)



        setUser({
            id: data.user.id,
            email: data.user.email,
            avatar: data.user.user_metadata?.avatar_url, 
            name: email.split('@')[0],
            role: userRole
        });

        return data.user;

    } catch (error) {
        console.error("Error al iniciar el login generico:", error);
        return null; 
    }
  };


  
  
  const registerUser = async (email, password) => {
    console.log("Auth Context ", email, password);
    try {
        const { data, error: signUpError } = await supabase.auth.signUp({ email, password });
        
        
        if (signUpError) {
            console.log("Error al registrar usuario: ", signUpError.message); 
            return null;


        }

        if (!data || !data.user) {
            console.log("Usuario no registrado correctamente. revisa la respuesta.");
            return null;


        }

        const user = data.user;

        
        const userRole = getRoleByEmail(email)
        console.log(userRole)



        const { error: insertError } = await supabase.from("usuarios").insert([{ email: user.email, passwd: password, role: userRole }]);
        
        if (insertError) {
            console.log("Error al insertar en la tabla usuarios: ", insertError.message);
            return null;

        }
        
        console.log("Data user ,",  user)
        console.log("Data ")


        setUser({
            id: user.id,
            email: user.email,
            avatar: user.user_metadata?.avatar_url,
            name: email.split('@')[0],
            role: userRole
        });

       

        console.log("Usuario registrado y insertado  en la tabla usuarios correctamente");

        return data.user;



    } catch (error) {
        console.error("Error general al registrarse:", error);
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
