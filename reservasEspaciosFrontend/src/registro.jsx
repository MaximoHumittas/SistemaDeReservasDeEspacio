import { useParams } from 'react-router-dom';

function Registro() {
  const { tipoUsuario } = useParams();  

  return (
    <div>
      <h1>Registro de {tipoUsuario}</h1>
      <form>

        <button type="submit">Registrarse</button>
      </form>
    </div>
  );
}

export default Registro;

