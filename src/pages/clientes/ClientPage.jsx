import React, {useEffect, useState} from "react";
import ClientCard from "../../components/cliente/ClientCard";
import { listarClientes } from "../../services/api";
import './ClientPage.css';

const ClientPage = () => {
    const [clients, setClients] = useState([]);

    useEffect(() => {
        const fetchClients = async () => {
            const response = await listarClientes();
            if (!response.error){
                setClients(response.data.clientes);
            }else{
                console.error('Error fetching clients:', response.message);
                setClients([
                    {
                        _id: '1',
                        nombre: 'Nombre ',
                        apellido: 'Apellido ',
                        correo: 'Correo ',
                        telefono: 'Telefono ',
                        estado: true,
                    },
                    {
                        _id: '2',
                        nombre: 'Nombre ',
                        apellido: 'Apellido ',
                        correo: 'Correo ',
                        telefono: 'Telefono ',
                        estado: false,
                    },
                ]);
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
                {clients.map((client)=>(
                    <ClientCard
                    key={client._id}
                    nombre={client.nombre}
                    apellido={client.apellido}
                    correo={client.correo}
                    telefono={client.telefono}
                    estado={client.estado}
                    />
                ))}
            </div>
        </div>
    )
}

export default ClientPage