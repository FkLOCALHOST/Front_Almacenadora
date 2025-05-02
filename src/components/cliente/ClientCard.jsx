import React from 'react';
import PropTypes from 'prop-types';

const ClientCard = ({ 
    id, 
    nombre, 
    apellido, 
    correo, 
    telefono, 
    estado, 
    isAdmin, 
    onEdit, 
    onDelete 
}) => {
    return ( 
        <div className={ `client-card ${ estado ? '' : 'inactive'}`}>
            <div className="client-details">
                <h3 className="client-name">Nombre: {nombre} {apellido}</h3>
                <p className="client-email">Correo: {correo}</p>
                <p className="client-phone">Telefono: {telefono}</p>
            </div>
            {isAdmin && (
                <div className="admin-actions">
                    <button className="edit-button" onClick={onEdit}>Editar</button>
                    <button className="delete-button" onClick={() => onDelete(id)}>Eliminar</button>
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
    isAdmin: PropTypes.bool.isRequired,
    onEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired
};

export default ClientCard;