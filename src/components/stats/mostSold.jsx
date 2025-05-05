import React from 'react';

const ProductoMasVendido = ({ productoMasVendido }) => {
  return (
    <div className="stat-card">
      <h2>Producto más vendido</h2>
      <p>
        {productoMasVendido
          ? `${productoMasVendido.nombreProducto}: ${productoMasVendido.cantidadVenta || 0} ventas`
          : "Cargando..."}
      </p>
    </div>
  );
};

export default ProductoMasVendido;
