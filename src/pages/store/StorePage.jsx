 import React, { useEffect, useState } from 'react';
 import StoreCard from '../../components/store/StoreCard'; // Import StoreCard component
 import { obtenerBodegas } from '../../services/api'; // Import API service for stores
 import './StorePage.css'; // Import CSS for StorePages
 
 const StorePage = () => {
   const [stores, setStores] = useState([]);
 
   useEffect(() => {
     const fetchStores = async () => {
       const response = await obtenerBodegas();
       if (!response.error) {
         setStores(response.data.bodegas); // Assuming response.data contains the store list
       } else {
         console.error('Error fetching stores:', response.message);
         // Mock data in case of an error
         setStores([
           {
             _id: '1',
             fechaIngreso: '2024-11-09',
             fechaSalida: '2025-01-20',
             lote: '6810549a076b10c504d35ddd',
             trabajador: '68104f6306d97dbf8f5b0a13',
             estado: true,
           },
           {
             _id: '2',
             fechaIngreso: '2023-06-11',
             fechaSalida: '2024-03-18',
             lote: '6810549a076b10c504d35ddd',
             trabajador: '68104f6306d97dbf8f5b0a13',
             estado: false,
           },
         ]);
       }
     };
 
     fetchStores();
   }, []);
 
   const handleAddWStore = () => {
     // Logic for adding a Store
     console.log('Add store button clicked');
   };
 
   return (
     <div className="store-page-container">
       <div className="store-header">
         <h1 className="store-title">Bodegas</h1>
         <button className="add-store-button" onClick={handleAddWStore}>
           Agregar Bodega
         </button>
       </div>
       <div className="store-grid">
         {stores.map((store) => (
           <StoreCard
             key={store._id}
             fechaIngreso={store.fechaIngreso}
             fechaSalida={store.fechaSalida}
             lote={store.lote}
             trabajador={store.trabajador}
             estado={store.estado}
           />
         ))}
       </div>
     </div>
   );
 };
 
 export default StorePage;