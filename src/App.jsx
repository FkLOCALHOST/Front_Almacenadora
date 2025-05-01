import { Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "./themeContext";
import LoginPage from "./pages/auth/loginPage";
import HomePage from "./pages/homePage/HomePage";
import Register from "./components/login/Register";
import NavBar from "./components/navs/navBar";
import ProductPage from './pages/products/ProductPage';
import ClientPage from "./pages/clients/ClientPage";

function App() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const isLoggedIn = !!localStorage.getItem("Trabajador"); // Check if user is logged in

  return (
    <>
      <NavBar theme={theme} toggleTheme={toggleTheme} />
      <div id="root">
        <Routes>
          <Route
            path="/"
            element={<Navigate to="/auth/login" />}
          />
          <Route path="/auth/login" element={<LoginPage />} />
          <Route path="/home" element={isLoggedIn ? <HomePage /> : <Navigate to="/auth/login" />} />
          <Route
            path="/auth/register"
            element={<Register switchAuthHandler={() => {}} />}
          />
          <Route path="/productos/listarProductos" element={<ProductPage />} />
          <Route path="/clientes/listarClientes" element={<ClientPage/>}/>
        </Routes>
        
      </div>
    </>
  );
}

export default App;
