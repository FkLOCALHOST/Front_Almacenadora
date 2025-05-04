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

  const toggleOrder = () => {
    setOrdenarPor((prevOrdenarPor) =>
      prevOrdenarPor === "fechaIngreso" ? "fechaSalida" : "fechaIngreso"
    );
  };

  const bodegasOrdenadas = useMemo(() => {
    if (!bodegas || bodegas.length === 0) return []; 

    return [...bodegas].sort((a, b) => {
      return new Date(b.fechaSalida) - new Date(a.fechaSalida); 
    });
  }, [bodegas]); 

  const fechasConMasSalidas = useMemo(() => {
    const result = bodegasOrdenadas.reduce((acc, bodega) => {
      const fechaSalida = new Date(bodega.fechaSalida).toLocaleDateString(); // Formateamos la fecha
      acc[fechaSalida] = (acc[fechaSalida] || 0) + 1; // Contamos cuántas veces aparece cada fecha
      return acc;
    }, {});

    // Convertimos el objeto en un array de objetos con fecha y cantidad
    const fechasAgrupadas = Object.entries(result).map(([fecha, cantidad]) => ({
      fecha,
      cantidad,
    }));

    // Ordenamos las fechas por la cantidad de salidas (de mayor a menor)
    const fechasOrdenadas = fechasAgrupadas.sort((a, b) => b.cantidad - a.cantidad);

    return fechasOrdenadas;
  }, [bodegasOrdenadas]); // Solo se recalcula cuando 'bodegasOrdenadas' cambia

  const fechaConMasSalidas = fechasConMasSalidas[0] || {}; 
  const fechaConMenosSalidas = fechasConMasSalidas[fechasConMasSalidas.length - 1] || {}; 
  return {
    bodegasOrdenadas,
    fechasConMasSalidas,
    fechaConMasSalidas,
    fechaConMenosSalidas,
    errorMessage,
    toggleOrder,
    ordenarPor
  };
};

export default useBodegas;
