import React, { useEffect, useState } from "react";
import LoteCard from '../../components/lote/LoteCard';
import AddLoteForm from "../../components/lote/AddLoteForm";
import ConfirmDialog from "../../components/cliente/ConfirmDialog";
import {
  listarLote,
  eliminarLote,
  actualizarLote,
  crearLote,
  generarPDFLotes,
  //listarPorCantidadVentas, // Endpoint para productos top de ventas
  // obtenerInventarioTotal,  // Endpoint para inventario total de dinero
  // obtenerLotesPorVencer,   // Endpoint para lotes por vencer
} from '../../services/api';
import './HomePage.css';

// Componente de HomePage
const HomePage = () => {
  const [lotes, setlotes] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [loteToDelete, setloteToDelete] = useState(null);
  const [loteToEdit, setloteToEdit] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  // Nuevos estados para las tarjetas
  const [productosTop, setProductosTop] = useState([]);
  const [inventarioTotal, setInventarioTotal] = useState(0);
  const [lotesPorVencer, setLotesPorVencer] = useState(0);

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

  /*useEffect(() => {
    const fetchData = async () => {
      const productosResponse = await listarPorCantidadVentas();
      if (!productosResponse.error) {
        setProductosTop(productosResponse.data);
      } else {
        setErrorMessage("Error al cargar productos top.");
      }

     const inventarioResponse = await obtenerInventarioTotal();
      if (!inventarioResponse.error) {
        setInventarioTotal(inventarioResponse.data);
      } else {
        setErrorMessage("Error al cargar inventario total.");
      }

      const lotesVencerResponse = await obtenerLotesPorVencer();
      if (!lotesVencerResponse.error) {
        setLotesPorVencer(lotesVencerResponse.data);
      } else {
        setErrorMessage("Error al cargar lotes por vencer.");
      }
    };

    fetchData();
  }, []);*/

  useEffect(() => {
    const fetchLotes = async () => {
      const response = await listarLote();
      if (!response.error) {
        if (response.data.lotes.length === 0) {
          setErrorMessage("Sin datos en la base de datos.");
        } else {
          setlotes(response.data.lotes);
        }
      } else {
        setErrorMessage("Error al cargar los lotes.");
      }
    };

    fetchLotes();
  }, []);

  const handleAddLote = () => {
    setloteToEdit(null);
    setShowForm(true);
  };

  const handleEditLote = (lote) => {
    setloteToEdit(lote);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setloteToEdit(null);
  };

  const handleFormSubmit = async (loteData) => {
    try {
      if (loteToEdit) {
        const response = await actualizarLote(loteToEdit._id, loteData);
        if (!response.error && response.data.success) {
          setlotes((prevLotes) =>
            prevLotes.map((lote) =>
              lote._id === loteToEdit._id 
                ? { ... lote, loteData} 
                : lote
            )
          );
          handleRefresh();
        } else {
          setErrorMessage('Error al actualizar el lote.');
        }
      } else {
        const response = await crearLote(loteData);
        if (!response.error) {
          setlotes((prevLotes) => [...prevLotes, response.data]);
        } else {
          setErrorMessage('Error al agregar el lote.');
        }
        handleRefresh();
      }
    } catch (error) {
      setErrorMessage('Error al conectar con el servidor.');
    }
    setShowForm(false);
    setloteToEdit(null);
  };

  const handleDeleteLote = (id) => {
    setloteToDelete(id);
    setShowConfirmDialog(true);
  };

  const confirmDeleteLote = async () => {
    try {
      const response = await eliminarLote(loteToDelete);
      if (!response.error) {
        setlotes((prevLotes) =>
          prevLotes.filter((lote) => lote._id !== loteToDelete)
        );
      } else {
        setErrorMessage("Error al eliminar el lote.");
      }
    } catch (error) {
      setErrorMessage("Error al conectar con el servidor.");
    }
    setShowConfirmDialog(false);
    setloteToDelete(null);
  };

  const cancelDeleteClient = () => {
    setShowConfirmDialog(false);
    setloteToDelete(null);
  };

  const handleRefresh = () => {
    window.location.reload();
  }

  const handleGenerateReport = async () => {
    try {
      const response = await generarPDFLotes();
      if (!response.error) {
        const blob = response.data;
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "Lotes.pdf";
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
    <div>
      <h1>Welcome to Almacenadora</h1>
      <div className="stats-cards">
        <div className="stat-card">
          <h2>Productos Top de Ventas</h2>
          <p>{productosTop.length > 0 ? productosTop.map((producto) => `${producto.nombre}: ${producto.ventas}`).join(', ') : "Cargando..."}</p>
        </div>
        <div className="stat-card">
          <h2>Inventario Total de Dinero</h2>
          <p>${inventarioTotal.toFixed(2)}</p>
        </div>
        <div className="stat-card">
          <h2>Lotes por Vencer</h2>
          <p>{lotesPorVencer} lotes</p>
        </div>
        <div className="stat-card">
          <h2>Lotes Vencidos</h2>
          <p>{lotes.length} </p>
        </div>
      </div>
      
      <div className="client-page-container">
        <div className="clients-header">
          <h1 className="clients-title">Lotes</h1>
          <div className="clients-header-buttons">
            {isAdmin && (
              <button className="add-client-button" onClick={handleAddLote}>
                Agregar Lote
              </button>
            )}
            <button className="report-button" onClick={handleGenerateReport}>
              Informe de Lotes
            </button>
          </div>
        </div>

        <div className="clients-grid">
          {errorMessage ? (
            <p className="error-message">{errorMessage}</p>
          ) : (
            lotes
              .map((lote) => (
                <LoteCard
                  key={lote._id}
                  id={lote._id}
                  numeroLote={lote.numeroLote}
                  cantidad={lote.cantidad}
                  fechaCaducidad={lote.fechaCaducidad}
                  productos={lote.productos}
                  estado={lote.estado}
                  isAdmin={isAdmin}
                  onDelete={handleDeleteLote}
                  onEdit={() => handleEditLote(lote)}
                />
              ))
          )}
        </div>

        {showForm && isAdmin && (
          <AddLoteForm
            onClose={handleFormClose}
            onSubmit={handleFormSubmit}
            initialData={loteToEdit}
            isAdmin={isAdmin}
          />
        )}
        {showConfirmDialog && (
          <ConfirmDialog
            message="¿Está seguro de que desea eliminar este lote?"
            onConfirm={confirmDeleteLote}
            onCancel={cancelDeleteClient}
          />
        )}
      </div>
    </div>
  );
};

export default HomePage;
