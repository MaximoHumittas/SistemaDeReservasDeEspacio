
import { useState } from "react";
import { NavLink } from "react-router-dom";


export default function NavBar() {

    return (

        <div>

            <li>
                <NavLink to="/">Home</NavLink>
            </li>
            <li>
                <NavLink to="/login" >Login</NavLink>
            </li>
            <li>
                <NavLink to="/calendary">calendary</NavLink>
            </li>
            <li>
                <NavLink to="/formulary" >formulary</NavLink>
            </li>

        </div>
    )
}