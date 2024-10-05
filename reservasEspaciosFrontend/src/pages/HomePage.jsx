import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function HomePage() {
  const { user } = useContext(AuthContext);

  return (
    <div>
      <h1>{user ? `Bienvenido, ${user.name}` : "Home sin sesión, ingresa por favor"}</h1>
    </div>
  );
}
