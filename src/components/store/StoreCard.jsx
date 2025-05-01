import React from 'react';
 import PropTypes from 'prop-types';
 
 const StoreCard = ({ fechaIngreso, fechaSalida, lote, trabajador, estado }) => {
   return (
     <div className={`store-card ${estado ? '' : 'inactive'}`}>

       <div className="store-details">
         <h3 className="store-title">No. Lote: {lote.numeroLote}</h3>
         <p className="store-entryDate"><b>Fecha de Ingreso:</b> {fechaIngreso.slice(0,10)}</p>
         <p className="store-departureDate"><b>Fecha de Salida:</b> {fechaSalida.slice(0,10)}</p>
         <p className="store-lote"><b>Cantidad Lote:</b> {lote.cantidad}</p>
         <p className="store-lote"> <b>Fecha de Caducidad:</b> {lote.fechaCaducidad.slice(0,10)}</p>
         <p className="store-worker"><b>Trabajador asignado:</b> {`${trabajador.nombreT} ${trabajador.apellidoT}`}</p>
         <p className="store-worker"><b>DPI:</b> {trabajador.dpi}</p>
         <p className="store-worker"><b>Telefono del trabajador:</b> {trabajador.telefonoT}</p>
       </div>
     </div>
   );
 };
 
 StoreCard.propTypes = {
    fechaIngreso: PropTypes.string.isRequired,
    fechaSalida: PropTypes.string.isRequired,
    lote: PropTypes.object.isRequired,
    trabajador: PropTypes.object.isRequired,
    estado: PropTypes.bool.isRequired
 };
 
 export default StoreCard;