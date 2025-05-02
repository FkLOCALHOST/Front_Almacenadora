import React, { useEffect, useState } from 'react';
import ProveedorCard from '../../components/proveedor/ProveedorCard';
import { listarProveedores } from '../../services/api';
import './ProveedorPage.css';

const ProveedorPage = () => {
  const [proveedores, setProveedores] = useState([]);
  const [errorMessage, setErrorMessage] = useState(""); // State for error message

  useEffect(() => {
    const fetchProveedores = async () => {
      const response = await listarProveedores();
      if (!response.error) {
        if (response.data.proveedores.length === 0) {
          setErrorMessage("Sin datos en la base de datos.");
        } else {
          setProveedores(response.data.proveedores);
        }
      } else {
        setErrorMessage("Error al cargar los proveedores.");
      }
    };
    fetchProveedores();
  }, []);

  const handleAddProveedor = () => {
    console.log('Add proveedor button clicked');
  };

  return (
    <div className="proveedor-page-container">
      <div className="proveedores-header">
        <h1 className="proveedores-title">Proveedores</h1>
        <button className="add-proveedor-button" onClick={handleAddProveedor}>
          Agregar Proveedor
        </button>
      </div>
      <div className="proveedores-grid">
        {errorMessage ? (
          <p className="error-message">{errorMessage}</p>
        ) : (
          proveedores.map((proveedor) => (
            <ProveedorCard
              key={proveedor._id}
              nombre={proveedor.nombre}
              direccion={proveedor.direccion}
              telefono={proveedor.telefono}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default ProveedorPage;
