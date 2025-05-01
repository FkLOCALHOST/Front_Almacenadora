import React from 'react';
import PropTypes from 'prop-types';

const WorkerCard = ({ nombre, apellido, correo, telefono, rendimiento, role, fotoDePerfil, estado }) => {
  return (
    <div className={`worker-card ${estado ? '' : 'inactive'}`}>
      <img src={fotoDePerfil || 'https://via.placeholder.com/150'} alt={`${nombre} ${apellido}`} className="worker-image" />
      <div className="worker-details">
        <h3 className="worker-title">{`${nombre} ${apellido}`}</h3>
        <p className="worker-description">Correo: {correo}</p>
        <p className="worker-contact">Teléfono: {telefono}</p>
        <p className="worker-role">Rol: {role}</p>
        <p className="worker-performance">Rendimiento: {rendimiento}</p>
      </div>
    </div>
  );
};

WorkerCard.propTypes = {
  nombre: PropTypes.string.isRequired,
  apellido: PropTypes.string.isRequired,
  correo: PropTypes.string.isRequired,
  telefono: PropTypes.string.isRequired,
  rendimiento: PropTypes.number.isRequired,
  role: PropTypes.oneOf(['EMPLEADO_ROLE', 'ADMIN_ROLE']).isRequired,
  fotoDePerfil: PropTypes.string,
  estado: PropTypes.bool.isRequired,
};

export default WorkerCard;