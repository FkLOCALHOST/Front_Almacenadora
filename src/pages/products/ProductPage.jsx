import React, { useEffect, useState } from 'react';
import ProductCard from '../../components/product/productcard';
import { listarProductos } from '../../services/api';
import './ProductPage.css';

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [errorMessage, setErrorMessage] = useState(""); // State for error message

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await listarProductos();
      if (!response.error) {
        if (response.data.productos.length === 0) {
          setErrorMessage("Sin datos en la base de datos.");
        } else {
          setProducts(response.data.productos);
        }
      } else {
        setErrorMessage("Error al cargar los productos.");
      }
    };

    fetchProducts();
  }, []);

  const handleAddProduct = () => {
    console.log('Add product button clicked');
  };

  return (
    <div className="product-page-container">
      <div className="products-header">
        <h1 className="products-title">Productos</h1>
        <button className="add-product-button" onClick={handleAddProduct}>
          Agregar Producto
        </button>
      </div>
      <div className="products-grid">
        {errorMessage ? (
          <p className="error-message">{errorMessage}</p>
        ) : (
          products.map((product) => (
            <ProductCard
              key={product._id}
              nombreProducto={product.nombreProducto}
              descripcion={product.descripcion}
              precio={product.precio}
              categoria={product.categoria}
              urlImagen={product.urlImagen}
              estado={product.estado}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default ProductPage;