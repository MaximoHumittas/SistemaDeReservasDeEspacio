
import { useState } from "react"
import { Link } from "react-router-dom"

function Navbar() {

    const [menuOpen, setMenuOpen] = useState(false)

    {/*
    visit
    student
    teacher
    admin
    manager


     */}

    const [userType, setTypeUser] = useState("visit")

    const ChangeTypeUser = (event) => {
        setTypeUser(event.target.value)
    }

    return (
        //la aparencia por ahora es opcional

        <div>
            <p>estado del menu {menuOpen ? "Abierto" : "Cerrado"}</p>
            <button onClick={() => setMenuOpen(!menuOpen)}>click para cambiar</button>
            <p>Usuario {userType}</p>
            <form>
                <label>
                    <select value={userType} onChange={ChangeTypeUser}>
                        <option value="visit">Visita </option>
                        <option value="student">Usuario</option>
                        <option value="teacher">profesor</option>
                        <option value="manager">gestionador</option>
                        <option value="admin">admistrador</option>
                    </select>
                </label>
            </form>


            {menuOpen ? (

                <nav>



                    {userType === "student" && (

                        <>
                            <li>
                                <Link to="/user" >Usuario</Link>
                            </li>
                            <li>
                                <Link to="/calendar"  >Calendario</Link>
                            </li>
                        </>
                    )}
                    {userType === "manager" && (

                        <>
                            <li>
                                <Link to="/user" >Usuario de gestion</Link>
                            </li>
                            <li>
                                <Link to="/calendar"  >Calendario</Link>
                            </li>
                        
                            <li>
                                <Link to="/applications" >Tabla de Solicitudes</Link>
                            </li>
                        
                        </>

                    )}
                    {
                        userType === "teacher" && (
                            <>
                                <li>
                                    <Link to="/user" >Usuario Profesor</Link>
                                
                                </li>
                                <li>
                                    <Link to="/calendar"  >Calendario</Link>
                                </li>

                            </>
                            

                        )
                    }
                    {
                        userType === "admin" && (
                            <>
                                <li>
                                    <Link to="/user" >Usuario Profesor</Link>
                            
                                </li>
                                <li>
                                    <Link to="/calendar"  >Calendario</Link>
                                </li>

                        </>

                        )
                    }

                </nav>

            ) : 
             (
                <nav>
                    <li>
                        <Link to="/login" >Login</Link>
                    </li>
                    <li>
                        <Link to="/register" >Register</Link>
                    </li>

                </nav>

             )}


        </div>




    )
    
}

export default Navbar