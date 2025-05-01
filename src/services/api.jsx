import axios from "axios";

const apiAlmacenadora = axios.create({
  baseURL: "http://localhost:3001/almacenadora/v1", 
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

export const agregarClientes = async (data) => {
  try {
    return await apiAlmacenadora.post("/agregarClientes", data);
  } catch (error) {
    return { error: true, message: error.message };
  }
};

export const obtenerClientePorId = async (id) => {
  try {
    return await apiAlmacenadora.get(`/obtenerClientePorId/${id}`);
  } catch (error) {
    return { error: true, message: error.message };
  }
};

export const listarClientes = async () => {
  try {
    return await apiAlmacenadora.get("/");
  } catch (error) {
    return { error: true, message: error.message };
  }
};

export const eliminarClientes = async (id) => {
  try {
    return await apiAlmacenadora.delete(`/eliminarClientes/${id}`);
  } catch (error) {
    return { error: true, message: error.message };
  }
};

export const actualizarClientes = async (id, data) => {
  try {
    return await apiAlmacenadora.put(`/actualizarClientes/${id}`, data);
  } catch (error) {
    return { error: true, message: error.message };
  }
};

export const agregarProveedor = async (data) => {
  try {
    return await apiAlmacenadora.post("/agregar", data);
  } catch (error) {
    return { error: true, message: error.message };
  }
};

export const modificarProveedor = async (id, data) => {
  try {
    return await apiAlmacenadora.put(`/modificar/${id}`, data);
  } catch (error) {
    return { error: true, message: error.message };
  }
};

export const cambiarEstadoProveedor = async (id, data) => {
  try {
    return await apiAlmacenadora.patch(`/cambiar-estado/${id}`, data);
  } catch (error) {
    return { error: true, message: error.message };
  }
};

export const eliminarProveedor = async (id) => {
  try {
    return await apiAlmacenadora.delete(`/eliminar/${id}`);
  } catch (error) {
    return { error: true, message: error.message };
  }
};

export const listarProveedores = async () => {
  try {
    return await apiAlmacenadora.get("proveedor/listar");
  } catch (error) {
    return { error: true, message: error.message };
  }
};

export const buscarProveedor = async (id) => {
  try {
    return await apiAlmacenadora.get(`/buscar/${id}`);
  } catch (error) {
    return { error: true, message: error.message };
  }
};

export const obtenerTrabajadores = async () => {
  try {
    return await apiAlmacenadora.get("/obtenerTrabajadores");
  } catch (error) {
    return { error: true, message: error.message };
  }
};

export const actualizarEmpleado = async (tid, data) => {
  try {
    return await apiAlmacenadora.put(`/actualizarEmpleado/${tid}`, data);
  } catch (error) {
    return { error: true, message: error.message };
  }
};

export const eliminarEmpleado = async (tid) => {
  try {
    return await apiAlmacenadora.delete(`/eliminarEmpleado/${tid}`);
  } catch (error) {
    return { error: true, message: error.message };
  }
};

export const agregarProducto = async (data) => {
  try {
    return await apiAlmacenadora.post("/agregarProducto", data);
  } catch (error) {
    return { error: true, message: error.message };
  }
};

export const listarProductos = async () => {
  try {
    const response = await apiAlmacenadora.get("productos/listarProductos"); // Corrected endpoint
    return response; // Ensure response.data contains the product list
  } catch (error) {
    return { error: true, message: error.message };
  }
};

export const buscarProducto = async (idProducto) => {
  try {
    return await apiAlmacenadora.get(`/buscarProducto/${idProducto}`);
  } catch (error) {
    return { error: true, message: error.message };
  }
};

export const actualizarProducto = async (idProducto, data) => {
  try {
    return await apiAlmacenadora.put(`/actualizarProducto/${idProducto}`, data);
  } catch (error) {
    return { error: true, message: error.message };
  }
};

export const eliminarProducto = async (idProducto) => {
  try {
    return await apiAlmacenadora.delete(`/eliminarProducto/${idProducto}`);
  } catch (error) {
    return { error: true, message: error.message };
  }
};