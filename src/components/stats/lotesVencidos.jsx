import React from 'react';

const LotesVencidos = ({ lotes }) => {
  return (
    <div className="stat-card">
      <h2>Lotes por vencer</h2>
      <p>{lotes.length}</p>
    </div>
  );
};

export default LotesVencidos;
