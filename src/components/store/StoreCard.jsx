import React from 'react';
import PropTypes from 'prop-types';
 
 const StoreCard = ({ 
  id,
  numeroBodega, 
  fechaIngreso, 
  fechaSalida, 
  lote, 
  trabajador, 
  estado,
  isAdmin,
  onEdit,
  onDelete
}) => {
 return (
   <div className={`store-card ${estado ? '' : 'inactive'}`}>

     <div className="store-details">
       <h3 className="store-title"><b>Bodega: #</b>{numeroBodega}</h3>
       <p className="store-entryDate"><b>Fecha de Ingreso:</b> {fechaIngreso?.slice(0,10) || 'No especificada'}</p>
       <p className="store-departureDate"><b>Fecha de Salida:</b> {fechaSalida?.slice(0,10) || 'No especificada'}</p>
       <p className="store-lote"> <b>No. Lote:</b> {lote?.numeroLote || 'No especificado'}</p>
       <p className="store-lote"><b>Cantidad Lote:</b> {lote?.cantidad || 'No especificada'}</p>
       <p className="store-lote"> <b>Fecha de Caducidad:</b> {lote?.fechaCaducidad || 'No especificada'}</p>
       {trabajador && (
         <>
           <p className="store-worker"><b>Trabajador asignado:</b> {`${trabajador.nombreT || ''} ${trabajador.apellidoT || ''}`}</p>
           <p className="store-worker"><b>DPI:</b> {trabajador.dpi || 'No especificado'}</p>
           <p className="store-worker"><b>Telefono del trabajador:</b> {trabajador.telefonoT || 'No especificado'}</p>
         </>
       )}
     </div>
     {isAdmin && (
               <div className="admin-actions">
                   <button className="edit-client-button" onClick={onEdit}>Editar</button>
                   <button className="delete-client-button" onClick={() => onDelete(id)}>Eliminar</button>
               </div>
           )}
   </div>
 );
};

StoreCard.propTypes = {
  numeroBodega: PropTypes.string.isRequired,
  fechaIngreso: PropTypes.string.isRequired,
  fechaSalida: PropTypes.string.isRequired,
  lote: PropTypes.object.isRequired,
  trabajador: PropTypes.object.isRequired,
  estado: PropTypes.bool.isRequired
};

export default StoreCard;