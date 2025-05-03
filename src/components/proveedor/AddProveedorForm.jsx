import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import { agregarProveedor, actualizarProveedor } from '../../services/api';
import './AddProveedorForm.css';


const AddProveedorForm = ({
    onClose,
    onSubmit,
    initialData = null,
    isAdmin
}) => {
    const [formData, setFormData] = useState({
        nombre: "",
        direccion: "",
        telefono: "",
        estado: true,
    });

    useEffect(() => {
        if(initialData){
            setFormData({
                nombre: initialData.nombre || "",
                direccion: initialData.direccion || "",
                telefono: initialData.telefono || "",
                estado: initialData.estado !== undefined ? initialData.estado : true,
            });
        }
    }, [initialData]);

    const handleChange =  (e) => {
        const  { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const telefonoNumerico = Number(formData.telefono);
        if (isNaN(telefonoNumerico)) {
            alert("El teléfono debe contener solo números.");
            return;
        }
    
        try {
            let response;
            const dataToSend = {
                ...formData,
                telefono: telefonoNumerico,
            };
    
            if (initialData && initialData._id) {
                response = await actualizarProveedor(initialData._id, dataToSend);
            } else {
                response = await agregarProveedor(dataToSend);
            }
    
            if (!response.error) {
                onSubmit(response.data); 
                onClose();
            } else {
                console.error('Error al procesar la solicitud:', response.message);
            }
    
        } catch (error) {
            console.error('Error al conectar con el servidor: ', error);
        }
    };

return (
    <div className="add-proveedor-form-container">
        <div className="add-proveedor-form-content">
            <h2 className="form-title">{initialData ? 'Actualizar Proveedor' : 'Agregar Proveedor'}</h2>
            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <input
                        type="text"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                        placeholder="Nombre del Proveedor"
                        required
                    />
                </div>
                <div className="input-group">
                    <input
                        type="text"
                        name="direccion"
                        value={formData.direccion}
                        onChange={handleChange}
                        placeholder="Dirección del Proveedor"
                        required
                    />
                </div>
                <div className="input-group">
                    <input
                        type="text"
                        name="telefono"
                        value={formData.telefono}
                        onChange={handleChange}
                        placeholder="Teléfono del Proveedor"
                        required
                    />
                </div>
                {isAdmin &&(
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
)
}

AddProveedorForm.propTypes ={
    onClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    initialData: PropTypes.object,
    isAdmin: PropTypes.bool.isRequired,
}

export default AddProveedorForm;
