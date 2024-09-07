// Login.jsx
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from './userContext';

function Login() {
  const { tipoUsuario } = useContext(UserContext); 
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/home'); 
  };

  const handleRegister = () => {
    alert(`Registrarse como ${tipoUsuario}`);
  };

  return (
    <div>
      <h1>Login</h1>
      <p>Iniciar sesión como {tipoUsuario}</p>
      <button onClick={handleLogin}>Iniciar sesión</button>
      <button onClick={handleRegister}>Registrarse como {tipoUsuario}</button>
    </div>
  );
}

export default Login;
