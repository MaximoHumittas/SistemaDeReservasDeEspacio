import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Profile() {
  const { user } = useContext(AuthContext);

  // Verifica si hay un usuario autenticado
  if (!user) {
    return (
      <div>
        <h1>No hay sesión activa. Por favor, inicia sesión para ver tu perfil.</h1>
      </div>
    );
  }

  return (
    <div style={styles.profileContainer}>
      {/* Imagen de perfil */}
      <img
        src={user.avatar || "https://via.placeholder.com/150"}
        alt={`Foto de perfil de ${user.name}`}
        style={styles.profileImage}
      />

      {/* Información del usuario */}
      <div style={styles.userInfo}>
        <h2>Nombre: {user.name}</h2>
        <p>Rol: {user.role}</p>
        <p>Email: {user.email}</p>
        <p>ID del Usuario: {user.id}</p>
      </div>
    </div>
  );
}

// Estilos en línea para darle un formato simple a la página de perfil
const styles = {
  profileContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: "#f5f5f5",
    padding: "20px",
  },
  profileImage: {
    width: "150px",
    height: "150px",
    borderRadius: "50%",
    marginBottom: "20px",
  },
  userInfo: {
    textAlign: "center",
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    maxWidth: "400px",
    width: "100%",
  },
};
