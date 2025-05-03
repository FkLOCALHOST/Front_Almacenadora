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
                <div className="lote-productos">
                <h4>Productos:</h4>
    <ul>
        {productos && productos.length > 0 ? (
            productos.map((producto, index) => (
                <li key={producto.productoId || index}>
                    {producto.nombreProducto || 'Producto sin nombre'} (ID: {producto.productoId || 'Sin ID'})
                </li>
            ))
        ) : (
            <li>No hay productos asociados</li>
        )}
    </ul>
</div>te mando los demas archivos

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
    id: PropTypes.string.isRequired,
    numeroLote: PropTypes.string.isRequired,
    cantidad: PropTypes.string.isRequired,
    fechaCaducidad: PropTypes.string.isRequired,
    productos: PropTypes.arrayOf(
        PropTypes.shape({
            productoId: PropTypes.string,
            nombreProducto: PropTypes.string, 
        })
    ).isRequired,
    estado: PropTypes.bool.isRequired,
    isAdmin: PropTypes.bool.isRequired,
    onEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
};

export default LoteCard;