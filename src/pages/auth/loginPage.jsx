import React, { useState } from 'react';
import Login from '../../components/Login';
import Register from '../../components/Register';

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  const handleAuthPageToggle = () => {
    setIsLogin((prevState) => !prevState);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div style={{ width: '100%', maxWidth: '400px', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
        {isLogin ? (
          <Login switchAuthHandler={handleAuthPageToggle} />
        ) : (
          <Register switchAuthHandler={handleAuthPageToggle} />
        )}
      </div>
    </div>
  );
};

export default LoginPage;
