import React, { useEffect, useState } from 'react';
import WorkerCard from '../../components/worker/WorkerCard'; // Import WorkerCard component
import { obtenerTrabajadores } from '../../services/api'; // Import API service for workers
import './WorkerPage.css'; // Import CSS for WorkerPage

const WorkerPage = () => {
  const [workers, setWorkers] = useState([]);

  useEffect(() => {
    const fetchWorkers = async () => {
      const response = await obtenerTrabajadores();
      if (!response.error) {
        setWorkers(response.data.trabajadores); // Assuming response.data contains the worker list
      } else {
        console.error('Error fetching workers:', response.message);
        // Mock data in case of an error
        setWorkers([
          {
            _id: '1',
            nombre: 'Juan',
            apellido: 'Pérez',
            correo: 'juan.perez@example.com',
            telefono: '12345678',
            rendimiento: 85,
            role: 'EMPLEADO_ROLE',
            fotoDePerfil: 'https://via.placeholder.com/150',
            estado: true,
          },
          {
            _id: '2',
            nombre: 'Ana',
            apellido: 'Gómez',
            correo: 'ana.gomez@example.com',
            telefono: '87654321',
            rendimiento: 90,
            role: 'ADMIN_ROLE',
            fotoDePerfil: 'https://via.placeholder.com/150',
            estado: false,
          },
        ]);
      }
    };

    fetchWorkers();
  }, []);

  const handleAddWorker = () => {
    // Logic for adding a worker
    console.log('Add worker button clicked');
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
        {workers.map((worker) => (
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
        ))}
      </div>
    </div>
  );
};

export default WorkerPage;