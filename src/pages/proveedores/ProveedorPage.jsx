import React, { useEffect, useState } from 'react';
import ProveedorCard from '../../components/proveedor/ProveedorCard';
import { listarProveedores } from '../../services/api';
import './ProveedorPage.css';

const ProveedorPage = () => {
  const [proveedores, setProveedores] = useState([]);

  useEffect(() => {
    const fetchProveedores = async () => {
      const response = await listarProveedores();
      if (!response.error) {
        setProveedores(response.data.proveedores);
      } else {
        setProveedores([
          {
            _id: '1',
            nombreProveedor: 'Proveedor 1',
            direccion: 'Dirección 1',
            telefono: '123456789',
            correo: 'proveedor1@email.com',
            estado: true,
          },
          {
            _id: '2',
            nombreProveedor: 'Proveedor 2',
            direccion: 'Dirección 2',
            telefono: '987654321',
            correo: 'proveedor2@email.com',
            estado: false,
          },
        ]);
      }
    };
    fetchProveedores();
  }, []);

  const handleAddProveedor = () => {
    // Lógica para agregar proveedor
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
        {proveedores.map((proveedor) => (
          <ProveedorCard
            key={proveedor._id}
            nombre={proveedor.nombre}
            direccion={proveedor.direccion}
            telefono={proveedor.telefono}
            estado={proveedor.estado}
          />
        ))}
      </div>
    </div>
  );
};

export default ProveedorPage;
