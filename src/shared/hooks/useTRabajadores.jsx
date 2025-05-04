import { useState, useEffect, useMemo } from "react";
import { obtenerTrabajadores } from "../../services/api";

const useTrabajadores = () => {
  const [trabajadores, setTrabajadores] = useState([]);
  const [ordenarPor, setOrdenarPor] = useState("mejorRendimiento");
  const [errorMessage, setErrorMessage] = useState(""); 

  useEffect(() => {
    const fetchTrabajadores = async () => {
      try {
        const response = await obtenerTrabajadores(); 
        if (!response.error) {
          setTrabajadores(response.data.trabajadores || []);
        } else {
          setErrorMessage("Error al obtener los trabajadores.");
        }
      } catch (error) {
        setErrorMessage("Error al conectar con el servidor.");
      }
    };
    fetchTrabajadores();
  }, []);

  const toggleOrder = () => {
    setOrdenarPor((prev) =>
      prev === "mejorRendimiento" ? "peorRendimiento" : "mejorRendimiento"
    );
  };

  // Usamos useMemo para evitar la recalculación innecesaria
  const trabajadoresOrdenados = useMemo(() => {
    if (trabajadores.length === 0) {
      return []; 
    }

    return [...trabajadores].sort((a, b) => {
      const rendimientoA = a.rendimiento || 0;
      const rendimientoB = b.rendimiento || 0;

      return ordenarPor === "mejorRendimiento"
        ? rendimientoB - rendimientoA
        : rendimientoA - rendimientoB;
    });
  }, [trabajadores, ordenarPor]); // Recalcula cuando trabajadores o ordenarPor cambian

  return {
    trabajadoresOrdenados,
    errorMessage,
    toggleOrder,
    ordenarPor,
  };
};

export default useTrabajadores;
