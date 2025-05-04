import React from 'react';

const LotesPorVencer = ({ lotesPorVencer }) => {
  return (
    <div className="stat-card">
      <h2>Lotes por Vencer</h2>
      <p>{lotesPorVencer} lotes</p>
    </div>
  );
};

export default LotesPorVencer;
