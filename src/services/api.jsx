import axios from "axios";

const apiAlmacenadora = axios.create({
  baseURL: "http://localhost:3001/almacenadora/v1", // Asegúrate de que esta URL sea correcta
  timeout: 3000,
});

apiAlmacenadora.interceptors.request.use(
  (config) => {
    const trabajadorDetails = localStorage.getItem("Trabajador");

    if (trabajadorDetails) {
      const token = JSON.parse(trabajadorDetails).token;
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const register = async (data) => {
  try {
    return await apiAlmacenadora.post("/auth/register", data);
  } catch (e) {
    return {
      error: true,
      e,
    };
  }
};

export const login = async (data) => {
  try {
    return await apiAlmacenadora.post("/auth/login", data);
  } catch (error) {
    return { error: true, message: error.message };
  }
};

// aqui se añaden los endpoints de la api