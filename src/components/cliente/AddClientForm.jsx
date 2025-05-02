import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { agregarClientes, actualizarClientes } from '../../services/api';
import './AddClientForm.css';

const AddClientForm = ({ 
  onClose, 
  onSubmit, 
  initialData = null, 
  isAdmin 
}) => {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    correo: '',
    telefono: '',
    estado: true,
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        nombre: initialData.nombre || '',
        apellido: initialData.apellido || '',
        correo: initialData.correo || '',
        telefono: initialData.telefono || '',
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
        // Validar que initialData._id esté definido antes de llamar a actualizarClientes
        response = await actualizarClientes(initialData._id, formData);
      } else {
        // Llamar a agregar si no hay datos iniciales o _id
        response = await agregarClientes(formData);
      }

      if (!response.error) {
        onSubmit(formData); // Notificar al componente padre para actualizar la lista
        onClose(); // Cerrar el formulario
      } else {
        console.error('Error al procesar cliente:', response.message);
      }
    } catch (error) {
      console.error('Error al conectar con el servidor:', error);
    }
  };

  return (
    <div className="add-client-form-container">
      <div className="add-client-form-content">
        <h2 className="form-title">{initialData ? 'Actualizar Cliente' : 'Agregar Cliente'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="text"
              name="nombre"
              placeholder="Nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <input
              type="text"
              name="apellido"
              placeholder="Apellido"
              value={formData.apellido}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <input
              type="email"
              name="correo"
              placeholder="Correo"
              value={formData.correo}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <input
              type="text"
              name="telefono"
              placeholder="Teléfono"
              value={formData.telefono}
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

AddClientForm.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  initialData: PropTypes.object,
  isAdmin: PropTypes.bool.isRequired,
};

export default AddClientForm;
