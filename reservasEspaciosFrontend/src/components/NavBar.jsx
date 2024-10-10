import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

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
                <button>Login GenÃ©rico</button>
              </NavLink>
            </>
          )}
        </li>
      </ul>
    </nav>
  );
}