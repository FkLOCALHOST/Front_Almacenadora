import React, { useState, useContext } from 'react';
import { login } from '../../services/api'; // Llamada a la API para hacer login
import { FiEye, FiEyeOff } from 'react-icons/fi'; // Iconos para mostrar/ocultar contraseña
import { validateEmail, validateEmailMessage } from '../../shared/validators/validateEmail';
import { validatecontrasenaT, validatecontrasenaTMessage } from '../../shared/validators/validatePassword';
import { ThemeContext } from '../../themeContext'; // Obtener el contexto del tema
import { useNavigate } from 'react-router-dom'; // Para redirigir después de login exitoso

const Login = ({ switchAuthHandler, onLoginSuccess }) => {
  const { theme } = useContext(ThemeContext); // Obtener el tema actual
  const navigate = useNavigate(); // Inicializar el hook de navegación
  const [correoT, setCorreoT] = useState('');
  const [contrasenaT, setContrasenaT] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validación del correo electrónico
    if (!validateEmail(correoT)) {
      setError(validateEmailMessage);
      return;
    }

    // Validación de la contraseña
    if (!validatecontrasenaT(contrasenaT)) {
      setError(validatecontrasenaTMessage);
      return;
    }

    try {
      const response = await login({ correoT, contrasenaT });
      if (response.error) {
        setError('Inicio de sesión fallido. Verifica tus credenciales.');
      } else {
        setSuccess('¡Inicio de sesión exitoso!');
        localStorage.setItem('Trabajador', JSON.stringify(response.data)); // Guardar los detalles del trabajador en localStorage
        onLoginSuccess(); // Notificar al componente padre que el login fue exitoso
        navigate("/home"); // Redirigir a la página de inicio después del login exitoso
      }
    } catch (err) {
      setError('Ocurrió un error inesperado. Intenta de nuevo.');
    }
  };

  return (
    <div className={`login-container ${theme}`}> {/* Aplicar la clase del tema */}
      <div className="login-content">
        <h1 className="login-title">Almacenadora Virtual</h1>
        {error && <p style={{ color: 'red', marginBottom: '1rem' }}>{error}</p>}
        {success && <p style={{ color: 'green', marginBottom: '1rem' }}>{success}</p>}
        <form className="login-form" onSubmit={handleLogin}>
          <div className="input-group">
            <input
              type="text"
              placeholder="Correo Electrónico"
              value={correoT}
              onChange={(e) => setCorreoT(e.target.value)}
              required
            />
          </div>
          <div className="input-group" style={{ position: 'relative' }}>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Contraseña"
              value={contrasenaT}
              onChange={(e) => setContrasenaT(e.target.value)}
              required
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: 'absolute',
                right: '10px',
                top: '50%',
                transform: 'translateY(-50%)',
                cursor: 'pointer',
                color: '#9ca3af',
                fontSize: '1.5rem',
              }}
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </span>
          </div>
          <button type="submit" className="login-button">
            Iniciar Sesión
          </button>
        </form>
        <p className="register-text">
          ¿No tienes cuenta?{' '}
          <span className="register-link" onClick={switchAuthHandler}>
            Regístrate
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
