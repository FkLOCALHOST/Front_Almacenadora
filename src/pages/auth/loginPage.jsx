import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importar hook de navegación
import Login from "../../components/login/Login"; // Componente de Login
import Register from "../../components/login/Register"; // Componente de Registro

import "./Login.css";

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true); // Determina si se muestra el formulario de Login o de Registro
  const navigate = useNavigate(); // Inicializar el hook de navegación

  const handleAuthPageToggle = () => {
    setIsLogin((prevState) => !prevState); // Alterna entre true (Login) y false (Register)
  };

  const handleLoginSuccess = () => {
    navigate("/home"); // Redirigir a la página /home después de un login exitoso
  };

  return (
    <div className="login-page-container">
      <div className="auth-card">
        {isLogin ? (
          <Login
            switchAuthHandler={handleAuthPageToggle} // Función para cambiar entre login y registro
            onLoginSuccess={handleLoginSuccess} // Función que se ejecuta después de un login exitoso
          />
        ) : (
          <Register switchAuthHandler={handleAuthPageToggle} />
        )}
      </div>
    </div>
  );
};

export default LoginPage;
