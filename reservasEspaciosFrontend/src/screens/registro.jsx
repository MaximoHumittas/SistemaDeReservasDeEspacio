import { useParams } from 'react-router-dom';

function Registro() {
  const { tipoUsuario } = useParams();

  if (!tipoUsuario) {
    return <p>Tipo de usuario no especificado</p>;
  }

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
