import { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types'; 

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [tipoUsuario, setTipoUsuario] = useState('');

  useEffect(() => {
    const storedTipoUsuario = localStorage.getItem('tipoUsuario');
    if (storedTipoUsuario) {
      setTipoUsuario(storedTipoUsuario);
    }
  }, []);

  const updateTipoUsuario = (newTipo) => {
    setTipoUsuario(newTipo);
    localStorage.setItem('tipoUsuario', newTipo);
  };

  const logout = () => {
    setTipoUsuario('');
    localStorage.removeItem('tipoUsuario');
  };

  return (
    <UserContext.Provider value={{ tipoUsuario, updateTipoUsuario, logout }}>
      {children}
    </UserContext.Provider>
  );
}

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
