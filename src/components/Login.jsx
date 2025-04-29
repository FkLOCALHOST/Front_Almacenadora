import React, { useState } from 'react';
import { login } from '../services/api';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { validateEmail, validateEmailMessage } from '../shared/hooks/validators/validateEmail';
import { validatecontrasenaT, validatecontrasenaTMessage } from '../shared/hooks/validators/validatePassword';

const Login = ({ switchAuthHandler, onLoginSuccess }) => {
  const [correoT, setcorreoT] = useState('');
  const [contrasenaT, setcontrasenaT] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validate email
    if (!validateEmail(correoT)) {
      setError(validateEmailMessage);
      return;
    }

    // Validate password
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
        localStorage.setItem('Trabajador', JSON.stringify(response.data));
        onLoginSuccess(); // Notify parent component of successful login
      }
    } catch (err) {
      setError('Ocurrió un error inesperado. Intenta de nuevo.');
    }
  };

  return (
    <div className="login-container">
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
              onChange={(e) => setcorreoT(e.target.value)}
              required
            />
          </div>
          <div className="input-group" style={{ position: 'relative' }}>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Contraseña"
              value={contrasenaT}
              onChange={(e) => setcontrasenaT(e.target.value)}
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
