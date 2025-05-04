import { useState, useEffect } from 'react';
import { listarProductos } from '../../services/api'; // Asegúrate de importar la función listarProductos

const useProductos = () => {
  const [productos, setProductos] = useState([]);
  const [ordenarPor, setOrdenarPor] = useState('masVendido'); // Estado para ordenar los productos
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productosResponse = await listarProductos();
        if (!productosResponse.error) {
          setProductos(productosResponse.data.productos || []);
        } else {
          setErrorMessage('Error al cargar productos.');
        }
      } catch (error) {
        setErrorMessage('Error al conectar con el servidor.');
      }
    };
    fetchData();
  }, []);

  // Función para cambiar entre los productos más vendidos y los menos vendidos
  const toggleOrder = () => {
    setOrdenarPor((prevOrdenarPor) => (prevOrdenarPor === 'masVendido' ? 'menosVendido' : 'masVendido'));
  };

  // Ordenamos los productos dependiendo de la opción seleccionada
  const productosOrdenados = productos.sort((a, b) => {
    if (ordenarPor === 'masVendido') {
      return (b.cantidadVenta || 0) - (a.cantidadVenta || 0);
    } else {
      return (a.cantidadVenta || 0) - (b.cantidadVenta || 0);
    }
  });

  return {
    productosOrdenados,
    errorMessage,
    toggleOrder,
    ordenarPor
  };
};

export default useProductos;
