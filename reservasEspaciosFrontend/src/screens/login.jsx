import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '/src/userContext';

function Login() {
  const { tipoUsuario } = useContext(UserContext); 
  const navigate = useNavigate();

  const handleLogin = () => {
    if (tipoUsuario) {
      navigate('/home');
    } else {
      alert("Por favor selecciona un tipo de usuario.");
    }
  };

  const handleRegister = () => {
    if (tipoUsuario) {
      alert(`Registrarse como ${tipoUsuario}`);
    } else {
      alert("Por favor selecciona un tipo de usuario.");
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <p>{tipoUsuario ? `Iniciar sesión como ${tipoUsuario}` : 'Selecciona un tipo de usuario primero.'}</p>
      <button onClick={handleLogin}>Iniciar sesión</button>
      <button onClick={handleRegister}>Registrarse como {tipoUsuario || 'N/A'}</button>
    </div>
  );
}

export default Login;
