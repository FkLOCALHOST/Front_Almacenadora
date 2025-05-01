import React from 'react';
import PropTypes from 'prop-types';

const ClientCard = ({ nombre, apellido, correo, telefono, estado }) => {
    return ( 
        <div className={ `client-card ${ estado ? '' : 'inactive'}`}>
            <div className="client-details">
                <h3 className="client-name">Nombre: {nombre} {apellido}</h3>
                <p className="client-email">Correo: {correo}</p>
                <p className="client-phone">Telefono: {telefono}</p>
            </div>
        </div>
    );
};

ClientCard.propTypes = {
    nombre: PropTypes.string.isRequired,
    apellido: PropTypes.string.isRequired,
    correo: PropTypes.string.isRequired,
    telefono: PropTypes.string.isRequired,
    estado: PropTypes.bool.isRequired
};

export default ClientCard;