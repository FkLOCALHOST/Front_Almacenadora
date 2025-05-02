import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import navigation hook
import Login from "../../components/login/Login";
import Register from "../../components/login/Register";

import "./Login.css";

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate(); // Initialize navigation

  const handleAuthPageToggle = () => {
    setIsLogin((prevState) => !prevState);
  };

  const handleLoginSuccess = () => {
    navigate("/home"); // Redirect to /home after successful login
  };

  return (
    <div className="login-page-container">
      <div className="auth-card">
        {isLogin ? (
          <Login
            switchAuthHandler={handleAuthPageToggle}
            onLoginSuccess={handleLoginSuccess}
          />
        ) : (
          <Register switchAuthHandler={handleAuthPageToggle} />
        )}
      </div>
    </div>
  );
};

export default LoginPage;
