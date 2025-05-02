import React, { useEffect, useState } from "react";
import WorkerCard from "../../components/worker/WorkerCard";
import { obtenerTrabajadores } from "../../services/api";
import "./WorkerPage.css";

const WorkerPage = () => {
  const [workers, setWorkers] = useState([]);
  const [errorMessage, setErrorMessage] = useState(""); // State for error message

  useEffect(() => {
    const fetchWorkers = async () => {
      const response = await obtenerTrabajadores();
      if (!response.error) {
        if (response.data.trabajadores.length === 0) {
          setErrorMessage("Sin datos en la base de datos.");
        } else {
          setWorkers(response.data.trabajadores);
        }
      } else {
        setErrorMessage(
          response.message || "Error al cargar los trabajadores."
        );
      }
    };

    fetchWorkers();
  }, []);

  const handleAddWorker = () => {
    console.log("Add worker button clicked");
  };

  return (
    <div className="worker-page-container">
      <div className="workers-header">
        <h1 className="workers-title">Trabajadores</h1>
        <button className="add-worker-button" onClick={handleAddWorker}>
          Agregar Trabajador
        </button>
      </div>
      <div className="workers-grid">
        {errorMessage ? (
          <p className="error-message">{errorMessage}</p>
        ) : (
          workers.map((worker) => (
            <WorkerCard
              key={worker._id}
              nombre={worker.nombre}
              apellido={worker.apellido}
              correo={worker.correo}
              telefono={worker.telefono}
              rendimiento={worker.rendimiento}
              role={worker.role}
              fotoDePerfil={worker.fotoDePerfil}
              estado={worker.estado}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default WorkerPage;
