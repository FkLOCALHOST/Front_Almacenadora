import React, { useEffect, useState } from "react";
import ClientCard from "../../components/cliente/ClientCard";
import { listarClientes } from "../../services/api";
import './ClientPage.css';

const ClientPage = () => {
    const [clients, setClients] = useState([]);
    const [errorMessage, setErrorMessage] = useState(""); // State for error message

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
        console.log('Add client button clicked');
    };

    return (
        <div className="client-page-container">
            <div className="clients-header">
                <h1 className="clients-title">Clientes</h1>
                <button className="add-client-button" onClick={handleAddCliente}>
                    Agregar Cliente
                </button>
            </div>
            <div className="clients-grid">
                {errorMessage ? (
                    <p className="error-message">{errorMessage}</p>
                ) : (
                    clients.map((client) => (
                        <ClientCard
                            key={client._id}
                            nombre={client.nombre}
                            apellido={client.apellido}
                            correo={client.correo}
                            telefono={client.telefono}
                            estado={client.estado}
                        />
                    ))
                )}
            </div>
        </div>
    );
};

export default ClientPage;