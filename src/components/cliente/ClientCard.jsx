import React from 'react';
import PropTypes from 'prop-types';

const ClientCard = ({ 
    id, 
    nombre, 
    apellido, 
    correo, 
    telefono, 
    estado, 
    isAdmin = false, // Valor predeterminado
    onDelete = () => {}, // Valor predeterminado
    onEdit = () => {} // Valor predeterminado
}) => {
    return ( 
        <div className={ `client-card ${ estado ? '' : 'inactive'}`}>
            <div className="client-details">
                <h3 className="client-name">Nombre: {nombre} {apellido}</h3>
                <p className="client-email">Correo: {correo}</p>
                <p className="client-phone">Telefono: {telefono}</p>
            </div>
            {isAdmin && (
                <div className="client-card-actions">
                    <button 
                        className="edit-client-button" 
                        onClick={onEdit}
                    >
                        Editar
                    </button>
                    <button 
                        className="delete-client-button" 
                        onClick={() => onDelete(id)}
                        style={{ backgroundColor: 'red', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '4px', cursor: 'pointer' }}
                    >
                        Eliminar
                    </button>
                </div>
            )}
        </div>
    );
};

ClientCard.propTypes = {
    id: PropTypes.string.isRequired,
    nombre: PropTypes.string.isRequired,
    apellido: PropTypes.string.isRequired,
    correo: PropTypes.string.isRequired,
    telefono: PropTypes.string.isRequired,
    estado: PropTypes.bool.isRequired,
    isAdmin: PropTypes.bool,
    onDelete: PropTypes.func,
    onEdit: PropTypes.func
};

export default ClientCard;