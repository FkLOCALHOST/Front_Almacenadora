import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { crearLote, actualizarLote } from '../../services/api';
import '../cliente/AddClientForm.css';

const AddLoteForm = ({
    onClose, 
    onSubmit, 
    initialData = null, 
    isAdmin 
}) => {
    const [formData, setFormData] = useState({
        numeroLote: '',
        cantidad: '',
        fechaCaducidad: '',
        nombreProducto: [],
        estado: true,
    });

    useEffect(() => {
        if (initialData) {
            setFormData({
                numeroLote: initialData.numeroLote || '',
                cantidad: initialData.cantidad || '',
                fechaCaducidad: initialData.fechaCaducidad || '',
                nombreProducto: initialData.productos?.map((producto) => producto.nombreProducto) || [],
                estado: initialData.estado !== undefined ? initialData.estado : true,      
            });
        }
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };


    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {
          ...formData
        };
        try {
            let response;
            if (initialData && initialData._id) {
                response = await actualizarLote(initialData._id, payload);
            } else {
                response = await crearLote(payload);
            }
    
            if (!response.error) {
                onSubmit(payload); 
                onClose();
            } else {
                console.error('Error al procesar el lote:', response.message);
            }
        } catch (error) {
            console.error('Error al conectar con el servidor:', error);
        }
    };

      return (
          <div className="add-client-form-container">
            <div className="add-client-form-content">
              <h2 className="form-title">{initialData ? 'Actualizar Lote' : 'Agregar Lote'}</h2>
              <form onSubmit={handleSubmit}>
                <div className="input-group">
                  <input
                    type="text"
                    name="numeroLote"
                    placeholder="Numero de lote"
                    value={formData.numeroLote}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="input-group">
                  <input
                    type="text"
                    name="cantidad"
                    placeholder="Cantidad dfe producto"
                    value={formData.cantidad}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="input-group">
                  <input
                    type="text"
                    name="fechaCaducidad"
                    placeholder="Fecha de Caducidad"
                    value={formData.fechaCaducidad}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="input-group">
                  <input
                    type="text"
                    name="nombreProducto"
                    placeholder="Nombre del priducto"
                    value={formData.nombreProducto}
                    onChange={handleChange}
                    required
                  />
                </div>
                {isAdmin && (
                  <button type="submit" className="form-button">
                    {initialData ? 'Actualizar' : 'Agregar'}
                  </button>
                )}
                <button type="button" className="form-button cancel-button" onClick={onClose}>
                  Cancelar
                </button>
              </form>
            </div>
          </div>
        );
      };
      
      AddLoteForm.propTypes = {
        onClose: PropTypes.func.isRequired,
        onSubmit: PropTypes.func.isRequired,
        initialData: PropTypes.object,
        isAdmin: PropTypes.bool.isRequired,
};

export default AddLoteForm;
