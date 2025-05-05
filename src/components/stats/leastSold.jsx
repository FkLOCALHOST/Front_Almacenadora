import React from 'react';

const ProductoMenosVendido = ({ productoMenosVendido }) => {
  return (
    <div className="stat-card">
      <h2>Producto menos vendido</h2>
      <p>
        {productoMenosVendido
          ? `${productoMenosVendido.nombreProducto}: ${productoMenosVendido.cantidadVenta || 0} ventas`
          : "Cargando..."}
      </p>
    </div>
  );
};

export default ProductoMenosVendido;
