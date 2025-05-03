import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { agregarBodega, actualizarBodega, listarLotes, listarTrabajadores } from '../../services/api';
import './addStoreForm.css';

const addStoreForm = ({ onClose, onSubmit, initialData = null, isAdmin }) => {
  const [formData, setFormData] = useState({
    numeroBodega: '',
    fechaIngreso: '',
    fechaSalida: '',
    lote: null,
    trabajador: null,
    estado: true,
  });

  const [lotesOptions, setLotesOptions] = useState([]);
  const [trabajadoresOptions, setTrabajadoresOptions] = useState([]);

  useEffect(() => {
    if (initialData) {
      setFormData({
        numeroBodega: initialData.numeroBodega || '',
        fechaIngreso: initialData.fechaIngreso || '',
        fechaSalida: initialData.fechaSalida || '',
        lote: initialData.lote
          ? { value: initialData.lote._id || initialData.lote, label: initialData.lote.numeroLote || initialData.lote }
          : null,
        trabajador: initialData.trabajador
          ? { value: initialData.trabajador._id || initialData.trabajador, label: initialData.trabajador.nombreT || initialData.trabajador }
          : null,
        estado: initialData.estado !== undefined ? initialData.estado : true,
      });
    }
  }, [initialData]);

  // Lista lotes
  useEffect(() => {
    const fetchLotes = async () => {
      const res = await listarLotes();
      if (!res.error) {
        const options = res.data.lotes.map(lote => ({
          value: lote._id,
          label: lote.numeroLote
        }));
        setLotesOptions(options);
      } else {
        console.error("Error al listar lotes:", res.message);
      }
    };
  
    fetchLotes();
  }, []);

    // Lista trabajadores
    useEffect(() => {
      const fetchTrabajadores = async () => {
        const res = await listarTrabajadores();
        if (!res.error) {
          const options = res.data.trabajadores.map(trabajador => ({
            value: trabajador._id, // Valor que se le asigna
            label: `${trabajador.dpi} | ${trabajador.nombreT} ${trabajador.apellidoT}` // Paremetros que se muestran en el select
          }));
          setTrabajadoresOptions(options);
        } else {
          console.error("Error al listar trabajadores:", res.message);
        }
      };
    
      fetchTrabajadores();
    }, []);

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    };

  const handleSelectChange = (selectedOption, { name }) => {
    setFormData(prev => ({ ...prev, [name]: selectedOption }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      lote: formData.lote?.value,
      trabajador: formData.trabajador?.value,
    };

    try {
      let response;
      if (initialData && initialData._id) {
        response = await actualizarBodega(initialData._id, payload);
      } else {
        response = await agregarBodega(payload);
      }

      if (!response.error) {
        onSubmit(payload);
        onClose();
      } else {
        console.error('Error al procesar la bodega:', response.message);
      }
    } catch (error) {
      console.error('Error al conectar con el servidor:', error);
    }
  };

  return (
    <div className="add-store-form-container">
      <div className="add-store-form-content">
        <h2 className="form-title">{initialData ? 'Actualizar Bodega' : 'Agregar Bodega'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="text"
              name="numeroBodega"
              placeholder="No. Bodega"
              value={formData.numeroBodega || ''}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <input
              type="text"
              name="fechaIngreso"
              placeholder="Fecha de Ingreso"
              value={formData.fechaIngreso || ''}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <input
              type="text"
              name="fechaSalida"
              placeholder="Fecha de Salida"
              value={formData.fechaSalida || ''}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Lote</label>
            <Select
              name="lote"
              options={lotesOptions}
              value={formData.lote}
              onChange={handleSelectChange}
              placeholder="Selecciona un lote"
            />
          </div>
            
          <div className="input-group">
            
            <label>Trabajador</label>
            
            <Select
              name="trabajador"
              options={trabajadoresOptions}
              value={formData.trabajador}
              onChange={handleSelectChange}
              placeholder="Selecciona un trabajador"
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

addStoreForm.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  initialData: PropTypes.object,
  isAdmin: PropTypes.bool.isRequired,
};

export default addStoreForm;