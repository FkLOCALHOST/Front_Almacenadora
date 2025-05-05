import { useState, useMemo } from "react";
import { obtenerTrabajadores } from "../../services/api"; // Asegúrate de tener esta importación

const useTrabajadores = () => {
  const [trabajadores, setTrabajadores] = useState([]);
  const [ordenarPor, setOrdenarPor] = useState("mejorRendimiento"); // Estado para ordenar por rendimiento
  const [errorMessage, setErrorMessage] = useState(""); // Mensaje de error

  useEffect(() => {
    const fetchTrabajadores = async () => {
      try {
        const response = await obtenerTrabajadores(); // Llamada a la API para obtener los trabajadores
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

  // Función para alternar el orden entre "mejorRendimiento" y "peorRendimiento"
  const toggleOrder = () => {
    setOrdenarPor((prev) =>
      prev === "mejorRendimiento" ? "peorRendimiento" : "mejorRendimiento"
    );
  };

  // Usamos useMemo para evitar el recalculo innecesario
  const trabajadoresOrdenados = useMemo(() => {
    if (!trabajadores || trabajadores.length === 0) {
      setErrorMessage("No hay trabajadores para mostrar.");
      return [];
    }

    return [...trabajadores].sort((a, b) => {
      const rendimientoA = a.rendimiento || 0;
      const rendimientoB = b.rendimiento || 0;

      // Si el orden es "mejorRendimiento", ordenamos de mayor a menor
      // Si es "peorRendimiento", ordenamos de menor a mayor
      return ordenarPor === "mejorRendimiento"
        ? rendimientoB - rendimientoA
        : rendimientoA - rendimientoB;
    });
  }, [trabajadores, ordenarPor]); // Recalcula cuando trabajadores o ordenarPor cambian

  return {
    trabajadoresOrdenados,
    errorMessage,
    toggleOrder,
    ordenarPor
  };
};

export default useTrabajadores;
