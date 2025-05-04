import React from 'react';
import PropTypes from 'prop-types';
import './ConfirmDialog.css';

const ConfirmDialog = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="confirm-dialog-overlay">
      <div className="confirm-dialog">
        <p className="confirm-dialog-message">{message}</p>
        <div className="confirm-dialog-buttons">
          <button className="confirm-button" onClick={onConfirm}>
            Confirmar
          </button>
          <button className="cancel-button" onClick={onCancel}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

ConfirmDialog.propTypes = {
  message: PropTypes.string.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default ConfirmDialog;
