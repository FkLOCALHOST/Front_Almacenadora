import { Routes, Route } from 'react-router-dom';
import { useContext } from 'react';
import { ThemeContext } from './themeContext'; // Importar el contexto del tema
import LoginPage from './pages/auth/loginPage';
import HomePage from './pages/HomePage';
import Register from './components/Register';

function App() {
  const { toggleTheme } = useContext(ThemeContext);

  return (
    <>
      <button onClick={toggleTheme} style={{ position: 'absolute', top: '10px', right: '10px' }}>
        Toggle Theme
      </button>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/auth/register" element={<Register switchAuthHandler={() => {}} />} />
      </Routes>
    </>
  );
}

export default App;
