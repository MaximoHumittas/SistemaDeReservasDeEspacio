import React from 'react';
import { NavLink } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-links">
                    <NavLink to="/about" className="footer-link">Inicio</NavLink>
                    <NavLink to="/about" className="footer-link">Acerca de</NavLink>
                    <NavLink to="/about" className="footer-link">Contacto</NavLink>
                </div>



                <div className="footer-copy">
                    <p>&copy; {new Date().getFullYear()} #SomosUCT</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
