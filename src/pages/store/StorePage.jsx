import React, { useEffect, useState } from "react";
import StoreCard from "../../components/store/StoreCard";
import { validateDate, validateDateMessage, validateDateMessage2 } from "../../shared/validators/validateDate";
import AddStoreForm from "../../components/store/addStoreForm";
import ConfirmDialog from "../../components/cliente/ConfirmDialog";
import {
  obtenerBodegas,
  agregarBodega,
  actualizarBodega,
  eliminarBodega,
  generarPDFBodega,
} from "../../services/api";
import "./StorePage.css";

const StorePage = () => {
  const [stores, setStores] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [storeToDelete, setStoreToDelete] = useState(null);
  const [storeToEdit, setStoreToEdit] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

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

  const handleAddStore = () => {
    setStoreToEdit(null); 
    setShowForm(true);
  };

  const handleEditStore = (store) => {
    setStoreToEdit(store); 
    setShowForm(true); 
  };

  const handleFormClose = () => {
    setShowForm(false);
    setStoreToEdit(null); 
  };

  const handleFormSubmit = async (storeData) => {
    try {
      if (storeToEdit) {
        const response = await actualizarBodega(storeToEdit._id, storeData);
        if (!response.error) {
            setStores((prevStore) =>
              prevStore.map((store) =>
                store._id === storeToEdit._id
                  ? { ...store, ...storeData }
                  : store
              )
            );
            handleRefresh();
        } else {
          setErrorMessage("Error al actualizar la bodega.");
        }
      } else {
        const response = await agregarBodega(storeData);
        if (!response.error) {
          setStores((prevStore) => [...prevStore, response.data]);
        } else {
          setErrorMessage("Error al agregar la bodega.");
        }
        handleRefresh();
      }
    } catch (error) {
      setErrorMessage("Error al conectar con el servidor.");
    }
    setShowForm(false);
    setStoreToEdit(null);
  };

  const handleDeleteStore = (id) => {
    setStoreToDelete(id);
    setShowConfirmDialog(true);
  };

  const confirmDeleteStore = async () => {
    try {
      const response = await eliminarBodega(storeToDelete);
      if (!response.error) {
        setStores((prevStore) =>
          prevStore.filter((store) => store._id !== storeToDelete)
        );
      } else {
        setErrorMessage("Error al eliminar la bodega.");
      }
    } catch (error) {
      setErrorMessage("Error al conectar con el servidor.");
    }
    setShowConfirmDialog(false);
    setStoreToDelete(null);
  };

  const cancelDeleteStore = () => {
    setShowConfirmDialog(false);
    setStoreToDelete(null);
  };

  const handleRefresh = () => {
    window.location.reload();
  }

  const filteredStores = stores.filter((store) => {
    const numero = store.numeroBodega?.toLowerCase() || '';
    const lote = store.lote?.numeroLote?.toLowerCase() || '';
    return (
      numero.includes(searchTerm.toLowerCase()) ||
      lote.includes(searchTerm.toLowerCase())
    );
  });

  const handleGenerateReport = async () => {
    try {
      const response = await generarPDFBodega();
      if (!response.error) {
        const blob = response.data;
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "Bodegas.pdf";
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
    <div className="store-page-container">
      <div className="store-header">
        <h1 className="store-title">Bodegas</h1>
        <div className="store-headers-buttons">
        <input className="search-bar-store"
            type="text"
            placeholder="Buscar bodega"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            />
          {isAdmin && (
            <button
              className="add-store-button"
              onClick={handleAddStore}
            >
              Agregar Bodega  
            </button>
          )}
          <button className="report-button" onClick={handleGenerateReport}>
            Informe
          </button>
        </div>
      </div>
      <div className="store-grid">
         {errorMessage ? (
          <p className="error-message">{errorMessage}</p>
        ) : filteredStores.map((store) => (
          <StoreCard
            key={store._id}
            id={store._id}
            numeroBodega={store.numeroBodega}
            fechaIngreso={store.fechaIngreso}
            fechaSalida={store.fechaSalida}
            lote={store.lote}
            trabajador={store.trabajador}
            estado={store.estado}
            isAdmin={isAdmin}
            onDelete={handleDeleteStore}
            onEdit={() => handleEditStore(store)}
          />
        ))
        }
       </div>       

      {showForm && isAdmin && (
        <>
          <AddStoreForm
            onClose={handleFormClose}
            onSubmit={handleFormSubmit}
            initialData={storeToEdit} 
            isAdmin={isAdmin}
            errorMessage={errorMessage}
            stores={stores}
          />
        </>
        
      )}
      {showConfirmDialog && (
        <ConfirmDialog
          message="¿Está seguro de que desea eliminar esta bodega?"
          onConfirm={confirmDeleteStore}
          onCancel={cancelDeleteStore}
        />
      )}
    </div>
  );
};

export default StorePage;
