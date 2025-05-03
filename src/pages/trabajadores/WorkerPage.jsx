import React, { useEffect, useState } from "react";
import WorkerCard from "../../components/worker/WorkerCard";
import { obtenerTrabajadores, generarPDFTrabajadores, eliminarEmpleado } from "../../services/api";
import ConfirmDialog from "../../components/worker/ConfirmDialog";
import "./WorkerPage.css";

const WorkerPage = () => {
  const [workers, setWorkers] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isAdmin, setIsAdmin] = useState(false); // Estado para admin
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [workerToDelete, setWorkerToDelete] = useState(null);

  useEffect(() => {
    const trabajadorDetails = localStorage.getItem("Trabajador");
    if (trabajadorDetails) {
      const userDetails = JSON.parse(trabajadorDetails);
      if (userDetails && userDetails.userDetails) {
        const { role } = userDetails.userDetails;
        setIsAdmin(role === "ADMIN_ROLE");
      }
    }
  }, []);

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


  const handleDeleteWorker = (tid) => {
    setWorkerToDelete(tid);
    setShowConfirmDialog(true);
  };

  const confirmDeleteWorker = async () => {
    try {
      const response = await eliminarEmpleado(workerToDelete);
      if (!response.error) {
        setWorkers((prevWorkers) =>
          prevWorkers.filter((worker) => worker.tid !== workerToDelete)
        );
      } else {
        setErrorMessage("Error al eliminar el trabajador.");
      }
    } catch (error) {
      setErrorMessage("Error al conectar con el servidor.");
    }
    setShowConfirmDialog(false);
    setWorkerToDelete(null);
  };

  const cancelDeleteWorker = () => {
    setShowConfirmDialog(false);
    setWorkerToDelete(null);
  };

  const handleGenerateReport = async () => {
    try {
      const response = await generarPDFTrabajadores();
      if (!response.error) {
        const blob = response.data;
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "Trabajadores.pdf";
        a.click();
        window.URL.revokeObjectURL(url);
      } else {
        setErrorMessage("Error al generar el informe.");
      }
    } catch (error) {
      setErrorMessage("Error al conectar con el servidor.");
    }
  };

  return (
    <div className="worker-page-container">
      <div className="workers-header">
        <h1 className="workers-title">Trabajadores</h1>
        <div className="workers-header-buttons">
          {isAdmin && (
            <button className="report-button" onClick={handleGenerateReport}>
            Informe
          </button>
          )}
          
        </div>
      </div>
      <div className="workers-grid">
        {errorMessage ? (
          <p className="error-message">{errorMessage}</p>
        ) : (
          workers.map((worker) => (
            <WorkerCard
              key={worker.tid || worker.dpi}
              tid={worker.tid}
              nombreT={worker.nombreT}
              dpi={worker.dpi}
              apellidoT={worker.apellidoT}
              correoT={worker.correoT}
              telefonoT={worker.telefonoT}
              rendimientoT={worker.rendimientoT}
              role={worker.role}
              fotoDePerfil={worker.fotoDePerfil}
              estadoT={worker.estadoT}
              isAdmin={isAdmin}
              onDelete={handleDeleteWorker}
            />
          ))
        )}
      </div>
    
      {showConfirmDialog && (
        <ConfirmDialog
          message="¿Está seguro de que desea eliminar este trabajador?"
          onConfirm={confirmDeleteWorker}
          onCancel={cancelDeleteWorker}
        />
      )
      }
    </div>
  );
};

export default WorkerPage;
