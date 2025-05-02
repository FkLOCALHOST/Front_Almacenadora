import React, { useEffect, useState } from 'react';
import StoreCard from '../../components/store/StoreCard';
import { obtenerBodegas } from '../../services/api';
import './StorePage.css';

const StorePage = () => {
  const [stores, setStores] = useState([]);
  const [errorMessage, setErrorMessage] = useState(""); // State for error message

  useEffect(() => {
    const fetchStores = async () => {
      const response = await obtenerBodegas();
      if (!response.error) {
        if (response.data.bodegas.length === 0) {
          setErrorMessage("Sin datos en la base de datos.");
        } else {
          setStores(response.data.bodegas);
        }
      } else {
        setErrorMessage("Error al cargar las bodegas.");
      }
    };

    fetchStores();
  }, []);

  const handleAddWStore = () => {
    console.log('Add store button clicked');
  };

  return (
    <div className="store-page-container">
      <div className="store-header">
        <h1 className="store-title">Bodegas</h1>
        <button className="add-store-button" onClick={handleAddWStore}>
          Agregar Bodega
        </button>
      </div>
      <div className="store-grid">
        {errorMessage ? (
          <p className="error-message">{errorMessage}</p>
        ) : (
          stores.map((store) => (
            <StoreCard
              key={store._id}
              fechaIngreso={store.fechaIngreso}
              fechaSalida={store.fechaSalida}
              lote={store.lote}
              trabajador={store.trabajador}
              estado={store.estado}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default StorePage;