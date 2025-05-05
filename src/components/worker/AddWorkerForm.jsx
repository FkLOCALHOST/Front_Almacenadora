import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { register, actualizarEmpleado } from '../../services/api';
import { validateEmail, validateEmailMessage } from '../../shared/validators/validateEmail';
import { validatePhone, validatePhoneMessage } from '../../shared/validators/validatePhone';
import { validateDPI, validateDPIMessage } from '../../shared/validators/validateDpi';
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
    rendimientoT: 0,
  });

  const [errors, setErrors] = useState({});

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
        rendimientoT: initialData.rendimientoT || 0,
      });
    }
  }, [initialData]);

  const validateField = (name, value) => {
    switch (name) {
      case 'correoT':
        if (!validateEmail(value)) return validateEmailMessage;
        break;
      case 'telefonoT':
        if (!validatePhone(value)) return validatePhoneMessage;
        break;
      case 'dpi':
        if (!validateDPI(value)) return validateDPIMessage;
        break;
      case 'rendimientoT':
        if (isNaN(value) || value < 0) return 'El rendimiento debe ser un número positivo';
        break;
      default:
        if (!value) return 'Este campo es obligatorio';
    }
    return '';
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === 'rendimientoT' ? Number(value) : value,
    }));
    const errorMsg = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: errorMsg }));
  };

  const isFormValid = () => {
    const newErrors = {};
    Object.entries(formData).forEach(([name, value]) => {
      const errorMsg = validateField(name, value);
      if (errorMsg) newErrors[name] = errorMsg;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid()) return;
    try {
      let response;
      if (initialData && initialData._id) {
        // Editar trabajador existente
        response = await actualizarEmpleado(initialData._id, formData);
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
            {errors.nombreT && <span className="error-message">{errors.nombreT}</span>}
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
            {errors.apellidoT && <span className="error-message">{errors.apellidoT}</span>}
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
            {errors.dpi && <span className="error-message">{errors.dpi}</span>}
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
            {errors.correoT && <span className="error-message">{errors.correoT}</span>}
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
            {errors.telefonoT && <span className="error-message">{errors.telefonoT}</span>}
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
            {errors.rendimientoT && <span className="error-message">{errors.rendimientoT}</span>}
          </div>
          <div className="input-group">
            <select name="role" value={formData.role} onChange={handleChange} required
              disabled={initialData && initialData.role === 'ADMIN_ROLE'}
            >
              <option value="EMPLEADO_ROLE">Empleado</option>
              <option value="ADMIN_ROLE">Administrador</option>
            </select>
            {errors.role && <span className="error-message">{errors.role}</span>}
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
