import React from 'react';

const LotesVencidos = ({ lotes }) => {
  return (
    <div className="stat-card">
      <h2>Lotes Vencidos</h2>
      <p>{lotes.length}</p>
    </div>
  );
};

export default LotesVencidos;
