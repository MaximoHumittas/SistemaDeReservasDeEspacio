import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '/src/userContext';

function Intermediario() {
  const { updateTipoUsuario } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSelection = (tipo) => {
    updateTipoUsuario(tipo);
    navigate('/login');
  };

  const userTypes = ['estudiante', 'docente', 'administrativo'];

  return (
    <div>
      <h1>¿Cómo deseas ingresar?</h1>
      {userTypes.map(tipo => (
        <button key={tipo} onClick={() => handleSelection(tipo)}>
          Ingresar como {tipo}
        </button>
      ))}
    </div>
  );
}

export default Intermediario;
