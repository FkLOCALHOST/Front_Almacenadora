import React from 'react';
import PropTypes from 'prop-types';

const WorkerCard = ({nombreT, dpi, apellidoT, correoT, telefonoT, rendimientoT, role, fotoDePerfil, estadoT }) => {
  return (
    <div className={`worker-card ${estadoT ? '' : 'inactive'}`}>
      <img src={fotoDePerfil || 'https://via.placeholder.com/150'} alt={`${nombreT} ${apellidoT}`} className="worker-image" />
      <div className="worker-details">
        <h3 className="worker-title">{`${nombreT} ${apellidoT}`}</h3>
        <p className="worker-description">Correo: {correoT}</p>
        <p className="worker-contact">Teléfono: {telefonoT}</p>
        <p className="worker-role">Rol: {role}</p>
        <p className="worker-role">DPI: {dpi}</p>
        <p className="worker-performance">Rendimiento: {rendimientoT}</p>
      </div>
    </div>
  );
};

WorkerCard.propTypes = {
  nombreT: PropTypes.string.isRequired,
  apellidoT: PropTypes.string.isRequired,
  dpi: PropTypes.string.isRequired,
  correoT: PropTypes.string.isRequired,
  telefonoT: PropTypes.string.isRequired,
  rendimientoT: PropTypes.number.isRequired,
  role: PropTypes.oneOf(['EMPLEADO_ROLE', 'ADMIN_ROLE']).isRequired,
  fotoDePerfil: PropTypes.string,
  estadoT: PropTypes.bool.isRequired,
};

export default WorkerCard;