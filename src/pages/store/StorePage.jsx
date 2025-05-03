import React, { useEffect, useState } from "react";
import StoreCard from "../../components/store/StoreCard";
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
          const fetchResponse = await obtenerBodegaPorId(storeToEdit._id);
          if (!fetchResponse.error) {
            setStores((prevStore) =>
              prevStore.map((store) =>
                store._id === storeToEdit._id
                  ? fetchResponse.data.bodega
                  : store
              )
            );
          } else {
            setErrorMessage("Error al obtener la bodega actualizada.");
          }
        } else {
          setErrorMessage("Error al actualizar la bodega.");
        }
      } else {
        const response = await agregarBodega(storeData);
        if (!response.error) {
          setClients((prevStore) => [...prevStore, response.data]);
        } else {
          setErrorMessage("Error al agregar la bodega.");
        }
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
    <div className="proveedor-page-container">
      <div className="proveedores-header">
        <h1 className="proveedores-title">Proveedores</h1>
        <button className="add-proveedor-button" onClick={handleAddProveedor}>
          Agregar Proveedor
        </button>
        <div className="proveedores-headers-buttons">
          {isAdmin && (
            <button
              className="add-proveedor-button"
              onClick={handleAddProveedor}
            >
              Agregar
            </button>
          )}
          <button className="report-button" onClick={handleGenerateReport}>
            Informe
          </button>
        </div>
      </div>
      {showForm && isAdmin && (
        <AddStoreForm
          onClose={handleFormClose}
          onSubmit={handleFormSubmit}
          initialData={storeToEdit} //
          isAdmin={isAdmin}
        />
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
