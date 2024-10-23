import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import '../styles/NavBar.css';

export default function NavBar() {
  const { loginWithGoogle, user, logout } = useContext(AuthContext);

  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        {user && (
          <>
            <li>
              <NavLink to="/formulary">Formulary</NavLink>
            </li>
            <li>
              <NavLink to="/about">About</NavLink>
            </li>
            <li>
              <NavLink to="/reclamo">Reclamo</NavLink>
            </li>
          </>
        )}
        <li>
          {user ? (
            <>
              <span>{user.name}</span>
              <img src={user.avatar} alt="User Avatar" />
              <button onClick={logout}>Salir</button>
            </>
          ) : (
            <>
              <button onClick={loginWithGoogle}>Ingresar con Google</button>
              <NavLink to="/login-generico">
                <button>Login Genérico</button>
              </NavLink>
            </>
          )}
        </li>
      </ul>
    </nav>
  );
}