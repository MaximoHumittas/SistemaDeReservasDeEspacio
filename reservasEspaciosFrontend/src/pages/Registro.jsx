import { useNavigate } from 'react-router-dom';
import { useState, useContext } from 'react';
import { UserContext } from '../userContext';

function Registro() {
    const [formData, setFormData] = useState({ email: '', password: '', confirmPassword: '' });
    const [error, setError] = useState('');
    const { login, user } = useContext(UserContext);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            alert('Las contraseñas no coinciden');
            return;
        }

        if (!user.tipoUsuario) {
            alert('No se ha definido el tipo de usuario');
            return;
        }

        console.log('Datos enviados al backend:', {
            email: formData.email,
            password: formData.password,
            tipoUsuario: user.tipoUsuario
        });

        try {
            const response = await fetch('http://localhost:3000/registro', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password,
                    tipoUsuario: user.tipoUsuario
                }),
            });

            const result = await response.json(); 

            console.log('Respuesta del backend:', result);

            if (response.ok) {
                console.log('Registro exitoso, iniciando sesión...');
                await login(formData.email, formData.password); 
                navigate('/home'); 
            } else {
                setError('Error en el registro: ' + result.error || 'Ocurrió un error');
                console.error('Error en el registro:', result.error);
            }
        } catch (error) {
            console.error('Error en el registro:', error);
            setError('Error al registrar el usuario');
        }
    };

    return (
        <div className="registro-container">
            <h1>Registro de {user.tipoUsuario}</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
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