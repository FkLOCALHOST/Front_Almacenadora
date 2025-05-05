import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { crearLote, actualizarLote, listarProducto } from '../../services/api';
import '../cliente/AddClientForm.css';

const AddLoteForm = ({
    onClose, 
    onSubmit, 
    initialData = null, 
    isAdmin,
    productos = []
}) => {
    const [formData, setFormData] = useState({
        numeroLote: '',
        cantidad: '',
        fechaCaducidad: '',
        producto: null,
        estado: true,
    });

    const [ProductosOptions, setProductosOptions] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        if (initialData) {
            setFormData({
                numeroLote: initialData.numeroLote || '',
                cantidad: initialData.cantidad || '',
                fechaCaducidad: initialData.fechaCaducidad || '',
                producto: initialData.producto
                ? { value: initialData.producto._id || initialData.producto, label: initialData.producto.nombreProducto || initialData.producto }
                : null,
                estado: initialData.estado !== undefined ? initialData.estado : true,      
            });
        }
    }, [initialData]);

    useEffect(() => {
      const fetchProductos = async () => {
        const res = await listarProducto();
        if (!res.error){
          const options = res.data.productos.map(producto => ({
            value: producto._id,  // Este es el ID del producto
            label: producto.nombreProducto  // Este es el nombre del producto
          }));
          setProductosOptions(options);
        } else {
          console.error("Error al listar los lotes:", res.message);
        }
      };

      fetchProductos();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };

      const handleSelectChange = (selectedOption, {name}) => {
        setFormData(perv => ({...perv, [name]: selectedOption}));
      };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const existe = productos.some(
          (p) =>
            p.numeroLote === formData.numeroLote &&
          (!initialData || p._id !== initialData._id)
        );

        if (existe) {
          setErrorMessage("El número de lote ya existe.");
          return;
        }

        setErrorMessage("");


        const payload = {
          numeroLote: formData.numeroLote,
          cantidad: formData.cantidad,
          fechaCaducidad: formData.fechaCaducidad,
          productoId: formData.producto?.value, // <- este nombre es clave
          estado: formData.estado,
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
              {errorMessage &&
              <>
              <span className="error-message">{errorMessage}</span>
              <br />
              <br />
              </>
              }
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
                  <label>Producto</label>
                  <Select
                  name='producto'
                  options={ProductosOptions}
                  value={formData.producto}
                  onChange={handleSelectChange}
                  placeholder="Selecciona un producto"
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
