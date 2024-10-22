import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { supabase } from '../supabase/client';

function PaginaAdmi() {
    const { logout } = useContext(AuthContext);
    const [usuarios, setUsuarios] = useState([]);
    const [reservas, setReservas] = useState([]);
    const [loadingUsuarios, setLoadingUsuarios] = useState(true);
    const [loadingReservas, setLoadingReservas] = useState(true);
    const [errorUsuarios, setErrorUsuarios] = useState(null);
    const [errorReservas, setErrorReservas] = useState(null);

    useEffect(() => {
        const fetchUsuarios = async () => {
            try {
                const { data, error } = await supabase
                    .from('usuarios')
                    .select('*'); // Selecciona todos los campos

                if (error) {
                    console.error('Error obteniendo usuarios:', error);
                    setErrorUsuarios(error.message);
                } else {
                    setUsuarios(data);
                }
            } catch (error) {
                console.error('Error inesperado:', error.message);
                setErrorUsuarios(error.message);
            }
            setLoadingUsuarios(false);
        };

        const fetchReservas = async () => {
            try {
                const { data, error } = await supabase
                    .from('reservas')
                    .select('usuario_id, horario_id, created_at, id');

                if (error) {
                    console.error('Error obteniendo reservas:', error);
                    setErrorReservas(error.message);
                } else {
                    setReservas(data);
                }
            } catch (error) {
                console.error('Error inesperado:', error.message);
                setErrorReservas(error.message);
            }
            setLoadingReservas(false);
        };

        fetchUsuarios();
        fetchReservas();
    }, []);

    const handleLogout = async () => {
        await logout();
    };

    const handleDelete = async (id) => {
        const { error } = await supabase
            .from('reservas')
            .delete()
            .eq('id', id); // Elimina la reserva con el ID especificado

        if (error) {
            console.error('Error al eliminar reserva:', error);
        } else {
            // Actualiza la lista de reservas después de eliminar
            setReservas((prevReservas) => prevReservas.filter((reserva) => reserva.id !== id));
        }
    };

    if (loadingUsuarios || loadingReservas) {
        return <div>Cargando datos...</div>;
    }

    return (
        <div>
            <h2>Lista de Usuarios</h2>
            {errorUsuarios && <div>Error al cargar usuarios: {errorUsuarios}</div>}
            <ul>
                {usuarios.map((usuario) => (
                    <li key={usuario.id}>
                        Rol: {usuario.role}, Email: {usuario.email}
                    </li>
                ))}
            </ul>

            <h2>Lista de Reservas</h2>
            {errorReservas && <div>Error al cargar reservas: {errorReservas}</div>}
            <ul>
                {reservas.map((reserva) => (
                    <li key={reserva.id}>
                        Usuario ID: {reserva.usuario_id}, Horario ID: {reserva.horario_id}, Creado En: {reserva.created_at}
                        <button onClick={() => handleDelete(reserva.id)}>Eliminar</button> {/* Botón de eliminación */}
                    </li>
                ))}
            </ul>


        </div>
    );
}

export default PaginaAdmi;


