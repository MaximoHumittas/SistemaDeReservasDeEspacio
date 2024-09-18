
import { Link } from "react-router-dom";


function Navbar() {

    /** hay que poner la logica */
    return (

        <nav>

            <ul>
                <li>
                    <Link to='/home'>Home</Link>

                
                </li>
                <li>
                    <Link to='/calendar'>Calendario</Link>
                </li>
            </ul>

            

        </nav>
    )
}


export default Navbar