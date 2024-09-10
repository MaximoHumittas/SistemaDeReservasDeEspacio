import { useParams, useNavigate } from 'react-router-dom';
import { useState, useContext } from 'react';
import { UserContext } from '../userContext';

function Registro() {
    const { tipoUsuario } = useParams(); // Obtener el tipo de usuario de la URL
    const [formData, setFormData] = useState({ email: '', password: '', confirmPassword: '' });
    const { login } = useContext(UserContext);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validación básica
        if (formData.password !== formData.confirmPassword) {
            alert('Las contraseñas no coinciden');
            return;
        }

        // Log para verificar datos en el frontend
        console.log('Datos enviados al backend:', {
            email: formData.email,
            password: formData.password,
            tipoUsuario: tipoUsuario
        });

        // Enviar datos al backend
        try {
            const response = await fetch('http://localhost:3000/registro', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password,
                    tipoUsuario: tipoUsuario
                }),
            });

            const result = await response.json();
            console.log('Respuesta del backend:', result);

            // TEMPORAL: Usar login del contexto para simular registro
            await login(tipoUsuario);
            navigate('/home');
        } catch (error) {
            console.error('Error en el registro:', error);
        }
    };

    return (
        <div className="registro-container">
            <h1>Registro de {tipoUsuario}</h1>
            <form onSubmit={handleSubmit} className="registro-form">
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="Ingresa tu email"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Contraseña:</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        placeholder="Ingresa tu contraseña"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="confirmPassword">Confirmar Contraseña:</label>
                    <input
                        type="password"
                        name="confirmPassword"
                        id="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                        placeholder="Confirma tu contraseña"
                    />
                </div>

                <button type="submit" className="registro-button">Registrarse</button>
            </form>
        </div>
    );
}

export default Registro;
