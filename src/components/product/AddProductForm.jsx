import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { agregarProducto, actualizarProducto } from '../../services/api';
import './AddProductForm.css';

const AddProductForm = ({ 
  onClose, 
  onSubmit, 
  initialData = null, 
  isAdmin 
}) => {
  const [formData, setFormData] = useState({
    nombreProducto: '',
    descripcion: '',
    precio: '',
    categoria: '',
    urlImagen: '',
    estado: true,
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        nombreProducto: initialData.nombreProducto || '',
        descripcion: initialData.descripcion || '',
        precio: initialData.precio || '',
        categoria: initialData.categoria || '',
        urlImagen: initialData.urlImagen || '',
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
    try {
      let response;
      if (initialData && initialData._id) {
        response = await actualizarProducto(initialData._id, formData);
      } else {
        response = await agregarProducto(formData);
      }

      if (!response.error) {
        onSubmit(formData);
        onClose();
      } else {
        console.error('Error al procesar producto:', response.message);
      }
    } catch (error) {
      console.error('Error al conectar con el servidor:', error);
    }
  };

  return (
    <div className="add-product-form-container">
      <div className="add-product-form-content">
        <h2 className="form-title">{initialData ? 'Actualizar Producto' : 'Agregar Producto'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="text"
              name="nombreProducto"
              placeholder="Nombre del Producto"
              value={formData.nombreProducto}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <input
              type="text"
              name="descripcion"
              placeholder="Descripción"
              value={formData.descripcion}
              onChange={handleChange}
            />
          </div>
          <div className="input-group">
            <input
              type="number"
              name="precio"
              placeholder="Precio"
              value={formData.precio}
              onChange={handleChange}
              required
              min="0"
            />
          </div>
          <div className="input-group">
            <input
              type="text"
              name="categoria"
              placeholder="Categoría"
              value={formData.categoria}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <input
              type="text"
              name="urlImagen"
              placeholder="URL de la Imagen"
              value={formData.urlImagen}
              onChange={handleChange}
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

AddProductForm.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  initialData: PropTypes.object,
  isAdmin: PropTypes.bool.isRequired,
};

export default AddProductForm;