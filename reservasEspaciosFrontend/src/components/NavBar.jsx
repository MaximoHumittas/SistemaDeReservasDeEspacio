import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
// Importar el archivo Sass

import logo from "../assets/logo.svg"
import google from "../assets/google.png"
import email from "../assets/mail.png"

export default function NavBar() {
  const { loginWithGoogle, user, logout } = useContext(AuthContext);

  return (
    <nav className="navbar">
      <img src={logo}></img>
      <ul className="navbar-menu">
        <li className="navbar-item">
          <NavLink to="/" className="navbar-link" activeClassName="active">Home</NavLink>
        </li>

        {user && (
          <>
            <li className="navbar-item">
              <NavLink to="/formulary" className="navbar-link" activeClassName="active">Formulario</NavLink>
            </li>
            <li className="navbar-item">
              <NavLink to="/about" className="navbar-link" activeClassName="active">Nosotros</NavLink>
            </li>
            <li className="navbar-item">
              <NavLink to="/reclamo" className="navbar-link" activeClassName="active">Ayuda</NavLink>
            </li>
          </>
        )}

        <li className="navbar-item navbar-right">
          {user ? (
            <>
              {/**
               * 
               * 
                */}
              <span className="navbar-user">{user.name}</span>

              <img src={user.avatar} alt="User Avatar" className="navbar-avatar" />
              <li className="navbar-item">
                <NavLink to="/profile" className="navbar-link" activeClassName="active">Perfil</NavLink>
              </li>
              <button className="navbar-button" onClick={logout}>Salir</button>
              
              
            </>
          ) : (
            <>
              <img src={google} className="logo"/>
              <button className="navbar-button" onClick={loginWithGoogle}>Ingresar con Google</button>
              <img src={email} className="logo"/>
              <NavLink to="/login-generico" className="navbar-link">
                <button className="navbar-button">Login</button>
              </NavLink>
            </>
          )}
        </li>
      </ul>
    </nav>
  );
}
