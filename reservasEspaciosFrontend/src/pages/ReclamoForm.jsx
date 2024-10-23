import { useState } from "react";
import { supabase } from "../supabase/client";

export default function ReclamoForm() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [reclamo, setReclamo] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const { data, error } = await supabase
        .from("reclamos") // Verifica que esta tabla exista en Supabase
        .insert([{ nombre, email, reclamo }]);

      if (error) {
        console.error("Error al enviar reclamo:", error);
        setError("Hubo un problema al enviar el reclamo. Inténtalo de nuevo.");
        return;
      }

      console.log("Reclamo enviado exitosamente:", data);
      // Limpia el formulario
      setNombre("");
      setEmail("");
      setReclamo("");
    } catch (err) {
      console.error("Error al enviar reclamo:", err);
      setError("Hubo un error al conectarse con el servidor.");
    }
  };

  return (
    <div>
      <h2>Formulario de Reclamo</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nombre">Nombre:</label>
          <input
            id="nombre"
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="reclamo">Reclamo:</label>
          <textarea
            id="reclamo"
            value={reclamo}
            onChange={(e) => setReclamo(e.target.value)}
            required
          />
        </div>
        <button type="submit">Enviar Reclamo</button>
      </form>
    </div>
  );
}