import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function LoginGenerico() {
  const { loginGeneric, registerUser } = useContext(AuthContext);
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const navigate = useNavigate();


  const isValidEmail = (email) => {
    return email.endsWith(".alu.uct") || email.endsWith("uct.cl");
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!isValidEmail(email)) {
      alert("El correo debe terminar en .alu.uct o uct.cl");
      return;
    };
    
    const response = await loginGeneric(email, password);
    
    if (response) {
      // Verificar si el correo termina en .admi.com
      if (email.endsWith('admi.com')) {
        navigate('/pagina-admi');  // Redirige a la página del administrador
      } else {
        navigate('/');  // Redirige a la página principal
      }
    } else {
      alert("Error en el inicio de sesión");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
  
    if (password !== repeatPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }
    
    const responseRegister = await registerUser(email, password);
    console.log("Respuesta registro; ", responseRegister)
    if (responseRegister) {
      navigate('/');
    } else {
      alert("Error en el registro"); 
    }
  };
  

  return (
    <div>
      <h1>{isRegistering ? "Registro" : "Login Genérico"}</h1>
      <form onSubmit={isRegistering ? handleRegister : handleLogin}>
        <div>
          <label htmlFor="email">Correo:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {isRegistering && (
          <div>
            <label htmlFor="repeatPassword">Repetir Contraseña:</label>
            <input
              type="password"
              id="repeatPassword"
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
              required
            />
          </div>
        )}
        <button type="submit">{isRegistering ? "Registrarse" : "Ingresar"}</button>
      </form>
      <button onClick={() => setIsRegistering(!isRegistering)}>
        {isRegistering ? "¿Ya tienes cuenta? Inicia sesión" : "¿No tienes cuenta? Regístrate"}
      </button>
    </div>
  );
}
