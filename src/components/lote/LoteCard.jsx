import React from "react";
import PropTypes from 'prop-types';

const LoteCard = ({
    id,
    numeroLote,
    cantidad,
    fechaCaducidad,
    productos,
    estado,
    isAdmin,
    onEdit,
    onDelete,
}) => {
    return (
        <div className={`lote-card ${estado ? '' : 'inactive'}`}>
            <div className="lote-details">
                <h3 className="lote-number">Número: {numeroLote}</h3>
                <p className="lote-cantidad">Cantidad del producto: {cantidad}</p>
                <p className="lote-fechaCaducidad">Fecha de caducidad: {fechaCaducidad}</p>
                <p className="lote-producto">Producto: {productos?.productoId}</p>
            </div>
            {isAdmin && (
                <div className="admin-acctions">
                    <button className="edit-client-button" onClick={onEdit}>
                        Editar
                    </button>
                    <button className="delete-client-button" onClick={() => onDelete(id)}>
                        Eliminar
                    </button>
                </div>
            )}
        </div>
    );
};

LoteCard.propTypes = {
    numeroLote: PropTypes.string.isRequired,
    cantidad: PropTypes.string.isRequired,
    fechaCaducidad: PropTypes.string.isRequired,
    productos: PropTypes.object.isRequired,
    estado: PropTypes.bool.isRequired,
};

export default LoteCard;