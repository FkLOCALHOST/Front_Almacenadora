import React, { useEffect, useState } from "react";
import ProveedorCard from "../../components/proveedor/ProveedorCard";
import AddProveedorForm from "../../components/proveedor/AddProveedorForm";
import ConfirmDialog from "../../components/proveedor/ConfirmDialog";
import {
  listarProveedores,
  agregarProveedor,
  actualizarProveedor,
  eliminarProveedor,
  generarPDFProveedores,
} from "../../services/api";
import "./ProveedorPage.css";

const ProveedorPage = () => {
  const [proveedores, setProveedores] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [proveedorToDelete, setProveedorToDelete] = useState(null);
  const [proveedorToEdit, setProveedorToEdit] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

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
    const fetchProveedores = async () => {
      const response = await listarProveedores();
      if (!response.error) {
        const activos = response.data.proveedores.filter((p) => p.estado);
        if (activos.length === 0) {
          setErrorMessage("Sin datos en la base de datos.");
        } else {
          setProveedores(activos);
        }
      } else {
        setErrorMessage("Error al cargar los proveedores.");
      }
    };

    fetchProveedores();
  }, []);

  const handleAddProveedor = () => {
    setProveedorToEdit(null);
    setShowForm(true);
  };

  const handleEditProveedor = (proveedor) => {
    setProveedorToEdit(proveedor);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setProveedorToEdit(null);
  };

  const handleFormSubmit = async (proveedorData) => {
    try {
      if (proveedorToEdit) {
        const response = await actualizarProveedor(
          proveedorToEdit._id,
          proveedorData
        );
        if (!response.error) {
          setProveedores((prev) =>
            prev.map((p) =>
              p._id === proveedorToEdit._id ? { ...p, ...proveedorData } : p
            )
          );
        } else {
          setErrorMessage("Error al actualizar el proveedor.");
        }
      } else {
        const response = await agregarProveedor(proveedorData);
        if (!response.error) {
          setProveedores((prev) => [...prev, response.data]);
        } else {
          setErrorMessage("Error al agregar el proveedor.");
        }
      }
    } catch (error) {
      setErrorMessage("Error al conectar con el servidor.");
    }
    setShowForm(false);
    setProveedorToEdit(null);
  };

  const handleDeleteProveedor = (id) => {
    setProveedorToDelete(id);
    setShowConfirmDialog(true);
  };

  const confirmDeleteProveedor = async () => {
    try {
      const response = await eliminarProveedor(proveedorToDelete);
      if (!response.error) {
        setProveedores((prev) =>
          prev.filter((p) => p._id !== proveedorToDelete)
        );
      } else {
        setErrorMessage("Error al eliminar el proveedor.");
      }
    } catch (error) {
      setErrorMessage("Error al conectar con el servidor.");
    }
    setShowConfirmDialog(false);
    setProveedorToDelete(null);
  };

  const cancelDeleteProveedor = () => {
    setShowConfirmDialog(false);
    setProveedorToDelete(null);
  };

  const handleGenerateReport = async () => {
    try {
      const response = await generarPDFProveedores();
      if (!response.error) {
        const blob = response.data;
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "Proveedores.pdf";
        a.click();
        window.URL.revokeObjectURL(url);
      } else {
        setErrorMessage("Error al generar el informe.");
      }
    } catch (error) {
      setErrorMessage("Error al conectar con el servidor.");
    }
  };

  const filteredProveedores = proveedores.filter((proveedor) =>
    proveedor.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="proveedor-page-container">
      <div className="proveedores-header">
        <h1 className="proveedores-title">Proveedores</h1>
        <div className="proveedores-header-buttons">
          <input
            type="text"
            className="search-bar-proveedor"
            placeholder="Buscar proveedor"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {isAdmin && (
            <button
              className="add-proveedor-button"
              onClick={handleAddProveedor}
            >
              Agregar Proveedor
            </button>
          )}
          <button className="report-button" onClick={handleGenerateReport}>
            Informe
          </button>
        </div>
      </div>
      <div className="proveedores-grid">
        {errorMessage ? (
          <p className="error-message">{errorMessage}</p>
        ) : (
          filteredProveedores.map((proveedor) => (
            <ProveedorCard
              key={proveedor._id}
              id={proveedor._id}
              nombre={proveedor.nombre}
              direccion={proveedor.direccion}
              telefono={proveedor.telefono}
              estado={proveedor.estado}
              isAdmin={isAdmin}
              onDelete={handleDeleteProveedor}
              onEdit={() => handleEditProveedor(proveedor)}
            />
          ))
        )}
      </div>
      {showForm && isAdmin && (
        <AddProveedorForm
          onClose={handleFormClose}
          onSubmit={handleFormSubmit}
          initialData={proveedorToEdit}
          isAdmin={isAdmin}
        />
      )}
      {showConfirmDialog && (
        <ConfirmDialog
          message="¿Está seguro de que desea eliminar este proveedor?"
          onConfirm={confirmDeleteProveedor}
          onCancel={cancelDeleteProveedor}
        />
      )}
    </div>
  );
};

export default ProveedorPage;