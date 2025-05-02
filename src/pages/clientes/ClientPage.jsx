import React, { useEffect, useState } from "react";
import ClientCard from "../../components/cliente/ClientCard";
import AddClientForm from "../../components/cliente/AddClientForm";
import ConfirmDialog from "../../components/cliente/ConfirmDialog";
import { listarClientes, eliminarClientes, actualizarClientes, agregarClientes, generarPDFClientes } from "../../services/api";
import './ClientPage.css';

const ClientPage = () => {
  const [clients, setClients] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [clientToDelete, setClientToDelete] = useState(null);
  const [clientToEdit, setClientToEdit] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false); // Estado para almacenar si el usuario es admin

  useEffect(() => {
    const trabajadorDetails = localStorage.getItem("Trabajador");
    if (trabajadorDetails) {
      const { role } = JSON.parse(trabajadorDetails);
      setIsAdmin(role === "ADMIN_ROLE"); // Verificar si el rol es admin
    }
  }, []);

  useEffect(() => {
    const fetchClients = async () => {
      const response = await listarClientes();
      if (!response.error) {
        if (response.data.clientes.length === 0) {
          setErrorMessage("Sin datos en la base de datos.");
        } else {
          setClients(response.data.clientes);
        }
      } else {
        setErrorMessage("Error al cargar los clientes.");
      }
    };

    fetchClients();
  }, []);

  const handleAddCliente = () => {
    setClientToEdit(null); // Clear any client being edited
    setShowForm(true);
  };

  const handleEditClient = (client) => {
    setClientToEdit(client); // Establecer el cliente a editar
    setShowForm(true); // Mostrar el formulario
  };

  const handleFormClose = () => {
    setShowForm(false);
    setClientToEdit(null);
  };

  const handleFormSubmit = async (clientData) => {
    try {
      if (clientToEdit) {
        // Actualizar cliente existente
        const response = await actualizarClientes(clientToEdit._id, clientData);
        if (!response.error) {
          setClients((prevClients) =>
            prevClients.map((client) =>
              client._id === clientToEdit._id ? { ...client, ...clientData } : client
            )
          );
        } else {
          setErrorMessage("Error al actualizar el cliente.");
        }
      } else {
        // Agregar nuevo cliente
        const response = await agregarClientes(clientData);
        if (!response.error) {
          setClients((prevClients) => [...prevClients, response.data]);
        } else {
          setErrorMessage("Error al agregar el cliente.");
        }
      }
    } catch (error) {
      setErrorMessage("Error al conectar con el servidor.");
    }
    setShowForm(false); // Cerrar el formulario
    setClientToEdit(null); // Limpiar el cliente a editar
  };

  const handleDeleteClient = (id) => {
    setClientToDelete(id);
    setShowConfirmDialog(true);
  };

  const confirmDeleteClient = async () => {
    try {
      const response = await eliminarClientes(clientToDelete);
      if (!response.error) {
        setClients((prevClients) => prevClients.filter(client => client._id !== clientToDelete));
      } else {
        setErrorMessage("Error al eliminar el cliente.");
      }
    } catch (error) {
      setErrorMessage("Error al conectar con el servidor.");
    }
    setShowConfirmDialog(false);
    setClientToDelete(null);
  };

  const cancelDeleteClient = () => {
    setShowConfirmDialog(false);
    setClientToDelete(null);
  };

  const handleGenerateReport = async () => {
    try {
      const response = await generarPDFClientes();
      if (!response.error) {
        const blob = response.data;
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "Clientes.pdf";
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
    <div className="client-page-container">
      <div className="clients-header">
        <h1 className="clients-title">Clientes</h1>
        <div className="clients-header-buttons">
          {isAdmin && ( // Mostrar el botón de agregar solo si es admin
            <button className="add-client-button" onClick={handleAddCliente}>
              Agregar Cliente
            </button>
          )}
          <button className="report-button" onClick={handleGenerateReport}>
            Informe
          </button>
        </div>
      </div>
      <div className="clients-grid">
        {errorMessage ? (
          <p className="error-message">{errorMessage}</p>
        ) : (
          clients
            .filter((client) => client.estado) // Filtrar clientes con estado: true
            .map((client) => (
              <ClientCard
                key={client._id} // Asegurar que la clave sea única
                id={client._id}
                nombre={client.nombre}
                apellido={client.apellido}
                correo={client.correo}
                telefono={client.telefono}
                estado={client.estado}
                isAdmin={isAdmin} // Pasar el estado de admin al componente
                onDelete={handleDeleteClient}
                onEdit={() => handleEditClient(client)}
              />
            ))
        )}
      </div>
      {showForm && isAdmin && (
        <AddClientForm
          onClose={handleFormClose}
          onSubmit={handleFormSubmit}
          initialData={clientToEdit} // Pass initial data if editing
          isAdmin={isAdmin} // Pasar el estado de admin al formulario
        />
      )}
      {showConfirmDialog && (
        <ConfirmDialog
          message="¿Está seguro de que desea eliminar este cliente?"
          onConfirm={confirmDeleteClient}
          onCancel={cancelDeleteClient}
        />
      )}
    </div>
  );
};

export default ClientPage;