
import { Link } from "react-router-dom"

function Navbar() {

    const navStyle = {

        padding: "10px",
        borderBottom: "2px solid #ccc"
    };

    const ulStyle = {
        listStyle: "none",
        display: "flex",
        gap: "20px",
        padding: "0",
        margin: "0"
    };

    const linkStyle = {
        color: "#fff",
        textDecoration: "none",
        fontSize: "18px"
    };

    return (
        //la aparencia por ahora es opcional
        <nav style={navStyle}>
            <h1 style={{ margin: "0", fontSize: "24px" }}>Menu</h1>
            <ul style={ulStyle}>
                <li>
                    <Link to="/" style={linkStyle}>Home</Link>
                </li>
                <li>
                    <Link to="/user" style={linkStyle}>Usuario</Link>
                </li>
                <li>
                    <Link to="/calendar" style={linkStyle} >Calendar</Link>
                </li>
                <li>
                    <Link to="/login" style={linkStyle}>Login</Link>
                </li>
                <li>
                    <Link to="/register" style={linkStyle}>Register</Link>
                </li>
                <li>
                    <Link to="/applications" style={linkStyle}>Tabla de Solicitudes</Link>
                </li>
            </ul>

        </nav>



    )
    
}

export default Navbar