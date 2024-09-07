import { useContext } from 'react';
import { UserContext } from '/src/userContext';

function Home() {
  const { tipoUsuario } = useContext(UserContext);

  return (
    <div>
      <h1>Bienvenido al Home</h1>
      <p>Has ingresado como {tipoUsuario || "Desconocido"}</p>
    </div>
  );
}

export default Home;
