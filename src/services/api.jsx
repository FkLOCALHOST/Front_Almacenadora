import axios from "axios";

const apiAlmacenadora = axios.create({
  baseURL: "http://localhost:3001/almacenadora/v1",
  timeout: 3000,
});

apiAlmacenadora.interceptors.request.use(
  (config) => {
    if (
      !config.url.includes("/auth/login") &&
      !config.url.includes("/auth/register")
    ) {
      const trabajadorDetails = localStorage.getItem("Trabajador");

      if (trabajadorDetails) {
        // Accede al token dentro de userDetails
        const token = JSON.parse(trabajadorDetails).userDetails.token;
        if (token) {
          config.headers["Authorization"] = `Bearer ${token}`;
        } else {
          console.error("No token found in localStorage");
        }
      } else {
        console.error("No trabajadorDetails found in localStorage");
      }
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
    const response = await apiAlmacenadora.post("/auth/login", data);
    if (response.data && response.data.trabajadorDetails) {
      // Guardar token y rol en localStorage
      localStorage.setItem("Trabajador", JSON.stringify(response.data));
    }
    return response;
  } catch (error) {
    return { error: true, message: error.message };
  }
};

export const agregarClientes = async (data) => {
  try {
    return await apiAlmacenadora.post("/clientes/agregarClientes", data);

  } catch (error) {
    return { error: true, message: error.message };
  }
};

export const obtenerClientePorId = async (id) => {
  try {
    return await apiAlmacenadora.get(`clientes/obtenerClientePorId/${id}`);
  } catch (error) {
    return { error: true, message: error.message };
  }
};

export const listarClientes = async () => {
  try {
    return await apiAlmacenadora.get("/clientes");
  } catch (error) {
    return { error: true, message: error.message };
  }
};

export const eliminarClientes = async (id) => {
  try {
    return await apiAlmacenadora.delete(`/clientes/eliminarClientes/${id}`);
  } catch (error) {
    return { error: true, message: error.message };
  }
};

export const actualizarClientes = async (id, data) => {
  try {
    return await apiAlmacenadora.put(`/clientes/actualizarClientes/${id}`, data);
  } catch (error) {
    return { error: true, message: error.message };
  }
};

export const generarPDFClientes = async () => {
  try {
    const response = await apiAlmacenadora.get("clientes/generarPDFClientes", {
      responseType: "blob", // Ensure the response is treated as a file
    });
    return response;
  } catch (error) {
    return { error: true, message: error.message };
  }
};

export const agregarProveedor = async (data) => {
  try {
    return await apiAlmacenadora.post("/proveedor/agregar", data);
  } catch (error) {
    return {
      error: true,
      message: error.response?.data?.errors?.map(err => err.msg) || [error.message || "Error desconocido"],
    };
  }
};

export const actualizarProveedor = async (id, data) => {
  try {
    return await apiAlmacenadora.put(`/proveedor/actualizar/${id}`, data);
  } catch (error) {
    return {
      error: true,
      message: error.response?.data?.errors?.map(err => err.msg) || [error.message || "Error desconocido"],
    };
  }
};

export const cambiarEstadoProveedor = async (id, data) => {
  try {
    return await apiAlmacenadora.patch(`/proveedor/cambiar-estado/${id}`, data);
  } catch (error) {
    return { error: true, message: error.message };
  }
};

export const eliminarProveedor = async (id) => {
  try {
    return await apiAlmacenadora.delete(`/proveedor/eliminar/${id}`);
  } catch (error) {
    return { error: true, message: error.message };
  }
};

export const listarProveedores = async () => {
  try {
    return await apiAlmacenadora.get("/proveedor/listar");
  } catch (error) {
    return { error: true, message: error.message };
  }
};

export const buscarProveedor = async (id) => {
  try {
    return await apiAlmacenadora.get(`proveedor/buscar/${nombre}`);
  } catch (error) {
    return { error: true, message: error.message };
  }
};

export const generarPDFProveedores = async () => {
  try {
    const response = await apiAlmacenadora.get("proveedor/generarReporte", {
      responseType: "blob", 
    });
    return response;
  } catch (error) {
    return { error: true, message: error.message };
  }
};

export const obtenerTrabajadores = async () => {
  try {
    const response = await apiAlmacenadora.get("/trabajador/obtenerTrabajadores");
    return response; // Ensure response.data contains the worker list
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return { error: true, message: "Endpoint no encontrado (404)." };
    }
    return { error: true, message: error.message };
  }
};

export const generarPDFTrabajadores = async () => {
  try {
    const response = await apiAlmacenadora.get(
      "/trabajador/generarPDFTrabajadores",
      {
        responseType: "blob",
      }
    );
    return response;
  } catch (error) {
    return { error: true, message: error.message };
  }
}

export const actualizarEmpleado = async (tid, data) => {
  try {
    return await apiAlmacenadora.put(`/trabajador/actualizarEmpleado/${tid}`, data);
  } catch (error) {
    return { error: true, message: error.message };
  }
};

export const eliminarEmpleado = async (tid) => {
  try {
    return await apiAlmacenadora.delete(`/trabajador/eliminarEmpleado/${tid}`);
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
    const response = await apiAlmacenadora.get("/productos/listarProductos");
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

export const generarPDFProductos = async () => {
  try {
    const response = await apiAlmacenadora.get("/generarPDFProductos", {
      responseType: "blob", // Ensure the response is treated as a file
    });
    return response;
  } catch (error) {
    return { error: true, message: error.message };
  }
}

export const listarPorCantidadVentas = async () => {
  try {
    return await apiAlmacenadora.get("/listarPorCantidadVentas");
  } catch (error) {
    return { error: true, message: error.message };
  }
}
  

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

export const agregarBodega = async (data) => {
  try {
    return await apiAlmacenadora.post("/bodega/agregarBodega", data);
  } catch (error) {
    return { error: true, message: error.message };
  }
};

export const obtenerBodegas = async () => {
  try {
    return await apiAlmacenadora.get("/bodega/");
  } catch (error) {
    return { error: true, message: error.message };
  }
};

export const crearLote = async (data) => {
  try {
    return await apiAlmacenadora.post("lote/crearLote", data);

  } catch (error) {
    return { error: true, message: error.message };
  }
};
    
 export const actualizarBodega = async (idBodega, data) => {
  try {
    return await apiAlmacenadora.put(`/bodega/actualizarBodega/${idBodega}`, data);
  } catch (error) {
    return { error: true, message: error.message };
  }
};

export const buscarLote = async (idLote) => {
  try {
    return await apiAlmacenadora.get(`lote/obtenerLotePorId/${idLote}`);
  } catch (error) {
    return { error: true, message: error.message };
  }
};
    
export const eliminarBodega = async (idBodega) => {
  try {
    return await apiAlmacenadora.delete(`/bodega/eliminarBodega/${idBodega}`);
  } catch (error) {
    return { error: true, message: error.message };
  }
};

export const listarLote = async () => {
  try {
    return await apiAlmacenadora.get("lote/");
  } catch (error) {
    return { error: true, message: error.message };
  }
};

export const generarPDFBodega = async () => {
  try {
    const response = await apiAlmacenadora.get("/bodega/pdf", {
      responseType: "blob",
    });
    return response;
  } catch (error) {
    return { error: true, message: error.message };
  }
};

export const eliminarLote = async (idLote) => {
  try {
    return await apiAlmacenadora.delete(`lote/eliminarLote/${idLote}`);
  } catch (error) {
    return { error: true, message: error.message };
  }
};
    
export const listarLotes = async () => {
  try {
    return await apiAlmacenadora.get("/lote/");
  } catch (error) {
    return { error: true, message: error.message };
  }
};

export const actualizarLote = async (idLote, data) => {
  try {
    return await apiAlmacenadora.put(`lote/actualizarLote/${idLote}`, data);
  } catch (error) {
    return { error: true, message: error.message };
  }
};
    
export const listarTrabajadores = async () => {
  try {
    return await apiAlmacenadora.get("/trabajador/obtenerTrabajadores");
  } catch (error) {
    return { error: true, message: error.message };
  }
};

export const generarPDFLotes = async () => {
  try {
    const response = await apiAlmacenadora.get("lote/generarPDFLotes", {
      responseType: "blob", // Ensure the response is treated as a file
    });
    return response;
  } catch (error) {
    return { error: true, message: error.message };
  }
};

export const generarPDFCantidadProductos = async () => {
  try {
    const response = await apiAlmacenadora.get("lote/totalProductos", {
      responseType: "blob", // Ensure the response is treated as a file
    });
    return response;
  } catch (error) {
    return { error: true, message: error.message };
  }
};

export const generarPDFCantidadTotalProductos = async () => {
  try {
    const response = await apiAlmacenadora.get("lote/CantidadTotalProductos", {
      responseType: "blob", // Ensure the response is treated as a file
    });
    return response;
  } catch (error) {
    return { error: true, message: error.message };
  }
};
