mport { useNavigate } from "react-router-dom";
import { signInWithGoogle } from "../client";

const GoogleSignInButton = () => {
  const navigate = useNavigate();

  const handleSignIn = async () => {
    try {
      const { user, error } = await signInWithGoogle();
      
      if (error) {
        throw error;
      }

      const { email, id } = user;

      const { data, error: supabaseError } = await supabase
        .from("nombre_de_tu_tabla")
        .insert([{ email: email, id_google: id }]);

      if (supabaseError) {
        throw supabaseError;
      }

      console.log("Usuario registrado en Supabase: ", data);

      navigate('/');
    } catch (error) {
      console.error("Error durante el inicio de sesión con Google:", error.message);
      alert("Hubo un problema al iniciar sesión con Google.");
    }
  };

  return <button onClick={handleSignIn}>Ingresar con Google</button>;
};

export default GoogleSignInButton;