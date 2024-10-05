import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function HomePage() {
  const { user } = useContext(AuthContext);

  return (
    <div>
      <h1>{user ? "Home con sesión" : "Home sin sesión, ingresa por favor"}</h1>
      {/* Aquí puedes añadir más contenido de la página de inicio */}
    </div>
  );
}
