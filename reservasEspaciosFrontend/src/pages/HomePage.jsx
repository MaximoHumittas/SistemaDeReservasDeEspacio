import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Card from "../components/Card"
import cato from "../assets/cato.jpg"

import { NavLink } from "react-router-dom";



export default function HomePage() {
  const { user } = useContext(AuthContext);

  return (
    <div className="home-container">
      <div className="card-wrapper">
        <Card title={"Reserva tu Espacio"} description={""} imageUrl={cato}  />
      </div>


    </div>
  );
}
