import { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { AuthService, ROLES } from './firebase/authService.js';

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const currentUser = AuthService.getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
    }
  }, []);

  const login = async (tipoUsuario) => {
    await AuthService.login(tipoUsuario);
    setUser(AuthService.getCurrentUser());
  };

  const logout = async () => {
    await AuthService.logout();
    setUser(null);
  };

  const updateUser = (newUserData) => {
    setUser((prevUser) => ({
      ...prevUser,
      ...newUserData,
    }));
  };

  return (
    <UserContext.Provider value={{ user, login, logout, updateUser, ROLES }}>
      {children}
    </UserContext.Provider>
  );
}

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
