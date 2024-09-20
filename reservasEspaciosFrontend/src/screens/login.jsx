import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../userContext';

function Login() {
  const { user,updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: '', password: '' });

  console.log("login, User context, tipo de usuario", user.tipoUsuario)


  console.log(user.tipoUsuario)



  const handleLogin = async (e) => {


    e.preventDefault();

    console.log("Datos enviandos al login", {

      email: formData.email,
      password: formData.password
    })


    try {

      const response = await fetch("http://localhost:3000/login", {

        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          tipoUsuario: user.tipoUsuario
        })

      })

      const result = await response.json()

      console.log("Respuesta del backend", result)

      if (response.ok) {
        console.log("Login exitoso")
        updateUser({ tipoUsuario: user.tipoUsuario });
        navigate('/home')
        
      }



    } catch (error) {
      console.log("Error", error)
    }
  };

    






    /* if (user) {
      navigate('/home');
    } else {
      alert('Por favor selecciona un tipo de usuario.');
    }

    */
  




  const handleRegister = () => {
    if (user) {
      navigate('/registro');
    } else {
      alert('Por favor selecciona un tipo de usuario.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  

  return (
    <div>
      <h1>Login</h1>
      {user ? (
        <div>
          <p>Iniciar sesión como {user.tipoUsuario}</p>
          <form onSubmit={handleLogin}>


            <div>
              <label htmlFor='email'>Email</label>
              <input 
                type="email"
                name='email'
                value={formData.email}
                onChange={handleChange}
                />

            </div>
            <div>
              <label htmlFor="password">Contraseña</label>
              <input 
                type="password" 
                name='password'
                value={formData.password}

                onChange={handleChange} />

            </div>


            <button type='submit'>Iniciar sesión</button>

          </form>
          
          
          <p>No tienes cuenta? <button onClick={handleRegister}>Regístrate</button></p>
        </div>
      ) : (
        <p>Selecciona un tipo de usuario primero.</p>
      )}
    </div>
  );
}

export default Login;