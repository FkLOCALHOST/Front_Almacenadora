import React, { useEffect, useState } from 'react';
import ProductCard from '../../components/product/productcard'; // Import ProductCard component
import { listarProductos } from '../../services/api'; // Import API service
import './ProductPage.css'; // Import CSS for ProductPage

const ProductPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await listarProductos();
      if (!response.error) {
        setProducts(response.data.productos); // Assuming response.data contains the product list
      }
    };

    fetchProducts();
  }, []);

  const handleAddProduct = () => {
    // Logic for adding a product
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
        {products.map((product) => (
          <ProductCard
            key={product._id}
            nombreProducto={product.nombreProducto}
            descripcion={product.descripcion}
            precio={product.precio}
            categoria={product.categoria}
            urlImagen={product.urlImagen}
            estado={product.estado}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductPage;