import { useState, useEffect, useMemo } from "react";
import { obtenerBodegas } from "../../services/api";

const useBodegas = () => {
  const [bodegas, setBodegas] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [ordenarPor, setOrdenarPor] = useState("fechaSalida"); // Ordenar por fecha de salida

  useEffect(() => {
    const fetchData = async () => {
      try {
        const bodegasResponse = await obtenerBodegas();
        if (!bodegasResponse.error) {
          setBodegas(bodegasResponse.data.bodegas || []);
        } else {
          setErrorMessage("Error al cargar bodegas.");
        }
      } catch (error) {
        setErrorMessage("Error al conectar con el servidor.");
      }
    };
    fetchData();
  }, []);

  // Alterna el orden por fechaIngreso o fechaSalida
  const toggleOrder = () => {
    setOrdenarPor((prevOrdenarPor) =>
      prevOrdenarPor === "fechaIngreso" ? "fechaSalida" : "fechaIngreso"
    );
  };

  const bodegasOrdenadas = useMemo(() => {
    if (!bodegas || bodegas.length === 0) return []; // Si no hay bodegas, retorna vacío.

    return [...bodegas].sort((a, b) => {
      const dateA = new Date(a[ordenarPor]);
      const dateB = new Date(b[ordenarPor]);
      return dateB - dateA; // Ordena descendente por fecha
    });
  }, [bodegas, ordenarPor]);

  // Agrupa las salidas por fecha y cuenta cuántas veces ocurre cada fecha
  const fechasConMasSalidas = useMemo(() => {
    const result = bodegasOrdenadas.reduce((acc, bodega) => {
      const fechaSalida = bodega.fechaSalida
        ? new Date(bodega.fechaSalida)
        : null; // Aseguramos que la fecha es válida
      if (!fechaSalida || isNaN(fechaSalida)) {
        console.error("Fecha inválida:", bodega.fechaSalida); // Mostramos un error en consola si la fecha es inválida
        return acc; // Si la fecha no es válida, omitimos esta bodega
      }

      // Formateamos la fecha a solo día/mes/año sin hora
      const fechaFormateada = fechaSalida.toLocaleDateString("es-ES"); // DD/MM/YYYY
      const cantidad = bodega.lote ? parseInt(bodega.lote.cantidad, 10) : 0; // Si no hay lote, poner cantidad 0

      if (acc[fechaFormateada]) {
        acc[fechaFormateada] += cantidad; // Sumar la cantidad por fecha
      } else {
        acc[fechaFormateada] = cantidad;
      }

      return acc;
    }, {});

    // Convertir el objeto a un array de objetos con 'fecha' y 'cantidad'
    return Object.entries(result)
      .map(([fecha, cantidad]) => ({
        fecha,
        cantidad,
      }))
      .filter((item) => item.cantidad > 0); // Filtrar las fechas sin salidas (cantidad > 0)
  }, [bodegasOrdenadas]);

  // Fecha con más salidas y menos salidas
  const fechaConMasSalidas = fechasConMasSalidas[0] || {};
  const fechaConMenosSalidas =
    fechasConMasSalidas[fechasConMasSalidas.length - 1] || {};

  return {
    bodegasOrdenadas,
    fechasConMasSalidas,
    fechaConMasSalidas,
    fechaConMenosSalidas,
    errorMessage,
    toggleOrder,
    ordenarPor,
  };
};

export default useBodegas;
