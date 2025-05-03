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
} from '../../services/api';
import './HomePage.css';

const HomePage = () => {
  const [lotes, setlotes] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [loteToDelete, setloteToDelete] = useState(null);
  const [loteToEdit, setloteToEdit] = useState(null);
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
                  lote._id === loteToEdit._id ? response.data.lote : lote
                )
              );
            } else {
              setErrorMessage(response.data?.msg || 'Error al actualizar el lote.');
            }
          } else {
            const response = await crearLote(loteData);
            if (!response.error && response.data.success) {
              setlotes((prevLotes) => [...prevLotes, response.data.lote]);
            } else {
              setErrorMessage(response.data?.msg || 'Error al agregar el lote.');
            }
          }
        } catch (error) {
          setErrorMessage('Error al conectar con el servidor.');
        }
        setShowForm(false); // Cerrar el formulario
        setloteToEdit(null); // Limpiar el lote a editar
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
      <div className="client-page-container">
            <div className="clients-header">
              <h1 className="clients-title">Lotes</h1>
              <div className="clients-header-buttons">
                {isAdmin && ( // Mostrar el botón de agregar solo si es admin
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
                  .filter((lote) => lote.estado) // Filtrar clientes con estado: true
                  .map((lote) => (
                    <LoteCard
                        key={lote._id}
                        id={lote._id}
                        numeroLote={lote.numeroLote}
                        cantidad={lote.cantidad}
                        fechaCaducidad={lote.fechaCaducidad}
                        productos={lote.productos || []} // Asegúrate de que productos sea un array
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
                initialData={loteToEdit} // Pass initial data if editing
                isAdmin={isAdmin} // Pasar el estado de admin al formulario
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
