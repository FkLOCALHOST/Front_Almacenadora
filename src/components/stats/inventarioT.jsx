import React from 'react';

const InventarioTotal = ({ inventarioTotal }) => {
  return (
    <div className="stat-card">
      <h2>Precio inventario</h2>
      <p>${inventarioTotal.toFixed(2)}</p>
    </div>
  );
};

export default InventarioTotal;
