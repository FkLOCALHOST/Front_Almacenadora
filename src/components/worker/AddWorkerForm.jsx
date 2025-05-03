import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { register, actualizarEmpleado } from '../../services/api';
import './AddWorkerForm.css';

const AddWorkerForm = ({ 
  onClose, 
  onSubmit, 
  initialData = null, 
  isAdmin 
}) => {
  const [formData, setFormData] = useState({
    nombreT: '',
    apellidoT: '',
    correoT: '',
    telefonoT: '',
    dpi: '',
    role: 'EMPLEADO_ROLE',
    estadoT: true,
    contrasenaT: '', // Solo para agregar
    rendimientoT: 0,
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        nombreT: initialData.nombreT || '',
        apellidoT: initialData.apellidoT || '',
        correoT: initialData.correoT || '',
        telefonoT: initialData.telefonoT || '',
        dpi: initialData.dpi || '',
        role: initialData.role || 'EMPLEADO_ROLE',
        estadoT: initialData.estadoT !== undefined ? initialData.estadoT : true,
        contrasenaT: '', // No mostrar contraseña al editar
        rendimientoT: initialData.rendimientoT || 0,
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === 'rendimientoT' ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response;
      if (initialData && initialData.tid) {
        // Editar trabajador existente
        const { contrasenaT, ...updateData } = formData; // No enviar contraseña si está vacía
        response = await actualizarEmpleado(initialData.tid, updateData);
      } else {
        // Registrar nuevo trabajador
        response = await register(formData);
      }
      if (!response.error) {
        onSubmit(formData);
        onClose();
      } else {
        console.error('Error al procesar trabajador:', response.message);
      }
    } catch (error) {
      console.error('Error al conectar con el servidor:', error);
    }
  };

  return (
    <div className="add-worker-form-container">
      <div className="add-worker-form-content">
        <h2 className="form-title">{initialData ? 'Actualizar Trabajador' : 'Agregar Trabajador'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="text"
              name="nombreT"
              placeholder="Nombre"
              value={formData.nombreT}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <input
              type="text"
              name="apellidoT"
              placeholder="Apellido"
              value={formData.apellidoT}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <input
              type="text"
              name="dpi"
              placeholder="DPI"
              value={formData.dpi}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <input
              type="email"
              name="correoT"
              placeholder="Correo"
              value={formData.correoT}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <input
              type="text"
              name="telefonoT"
              placeholder="Teléfono"
              value={formData.telefonoT}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <input
              type="number"
              name="rendimientoT"
              placeholder="Rendimiento"
              value={formData.rendimientoT}
              onChange={handleChange}
              min="0"
              required
            />
          </div>
          {!initialData && (
            <div className="input-group">
              <input
                type="password"
                name="contrasenaT"
                placeholder="Contraseña"
                value={formData.contrasenaT}
                onChange={handleChange}
                required
              />
            </div>
          )}
          <div className="input-group">
            <select name="role" value={formData.role} onChange={handleChange} required>
              <option value="EMPLEADO_ROLE">Empleado</option>
              <option value="ADMIN_ROLE">Administrador</option>
            </select>
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

AddWorkerForm.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  initialData: PropTypes.object,
  isAdmin: PropTypes.bool.isRequired,
};

export default AddWorkerForm;
