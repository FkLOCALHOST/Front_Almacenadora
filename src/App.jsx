import { Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "./themeContext";
import { FaSun, FaMoon } from "react-icons/fa";
import LoginPage from "./pages/auth/loginPage";
import HomePage from "./pages/homePage/HomePage";
import Register from "./components/Register";

function App() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const isLoggedIn = !!localStorage.getItem("Trabajador"); // Check if user is logged in

  return (
    <>
      <div
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          cursor: "pointer",
        }}
        onClick={toggleTheme}
      >
        {theme === "light" ? <FaSun size={24} /> : <FaMoon size={24} />}
      </div>
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
        </Routes>
      </div>
    </>
  );
}

export default App;
