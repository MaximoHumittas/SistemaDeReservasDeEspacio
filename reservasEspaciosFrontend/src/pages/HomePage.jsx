import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function HomePage() {
  const { user } = useContext(AuthContext);

  return (
    <div>
      <h1>{user ? `Bienvenido, ${user.name}` : "Home sin sesiÃ³n, ingresa por favor"}</h1>
    </div>
  );
}