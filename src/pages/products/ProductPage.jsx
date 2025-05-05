import React, { useEffect, useState } from "react";
import ProductCard from "../../components/product/ProductCard";
import AddProductForm from "../../components/product/AddProductForm";
import ConfirmDialog from "../../components/product/ConfirmDialog";
import {
  listarProductos,
  eliminarProducto,
  actualizarProducto,
  agregarProducto,
  generarPDFProductos,
} from "../../services/api";
import "./ProductPage.css";

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [productToEdit, setProductToEdit] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const trabajadorDetails = localStorage.getItem("Trabajador");
    if (trabajadorDetails) {
      const userDetails = JSON.parse(trabajadorDetails);
      if (userDetails && userDetails.userDetails) {
        const { role } = userDetails.userDetails;
        setIsAdmin(role === "ADMIN_ROLE");
      }
    }
  }, []);

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
    setProductToEdit(null);
    setShowForm(true);
  };

  const handleEditProduct = (product) => {
    setProductToEdit(product);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setProductToEdit(null);
  };

  const handleFormSubmit = async (productData) => {
    try {
      if (productToEdit) {
        const response = await actualizarProducto(
          productToEdit._id,
          productData
        );
        if (!response.error) {
          setProducts((prevProducts) =>
            prevProducts.map((product) =>
              product._id === productToEdit._id
                ? { ...product, ...productData }
                : product
            )
          );
        } else {
          setErrorMessage("Error al actualizar el producto.");
        }
      } else {
        const response = await agregarProducto(productData);
        if (!response.error) {
          setProducts((prevProducts) => [...prevProducts, response.data]);
        } else {
          setErrorMessage("Error al agregar el producto.");
        }
      }
    } catch (error) {
      setErrorMessage("Error al conectar con el servidor.");
    }
    setShowForm(false);
    setProductToEdit(null);
  };

  const handleDeleteProduct = (id) => {
    setProductToDelete(id);
    setShowConfirmDialog(true);
  };

  const confirmDeleteProduct = async () => {
    try {
      const response = await eliminarProducto(productToDelete);
      if (!response.error) {
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product._id !== productToDelete)
        );
      } else {
        setErrorMessage("Error al eliminar el producto.");
      }
    } catch (error) {
      setErrorMessage("Error al conectar con el servidor.");
    }
    setShowConfirmDialog(false);
    setProductToDelete(null);
  };

  const cancelDeleteProduct = () => {
    setShowConfirmDialog(false);
    setProductToDelete(null);
  };

  const handleGenerateReport = async () => {
    try {
      const response = await generarPDFProductos();
      if (!response.error) {
        const blob = response.data;
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "Productos.pdf";
        a.click();
        window.URL.revokeObjectURL(url);
      } else {
        setErrorMessage("Error al generar el informe.");
      }
    } catch (error) {
      setErrorMessage("Error al conectar con el servidor.");
    }
  };

  const filteredProducts = products
    .filter((product) => product.estado)
    .filter((product) =>
      product.nombreProducto.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div className="product-page-container">
      <div className="products-header">
        <h1 className="products-title">Productos</h1>
        <div className="products-header-buttons">
          <input
            type="text"
            className="search-bar-product"
            placeholder="Buscar producto"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {isAdmin && (
            <button className="add-product-button" onClick={handleAddProduct}>
              Agregar Producto
            </button>
          )}
          <button className="report-button" onClick={handleGenerateReport}>
            Informe
          </button>
        </div>
      </div>
      <div className="products-grid">
        {errorMessage ? (
          <p className="error-message">{errorMessage}</p>
        ) : (
          filteredProducts.map((product) => (
            <ProductCard
              key={product._id}
              id={product._id}
              nombreProducto={product.nombreProducto}
              descripcion={product.descripcion}
              precio={product.precio}
              categoria={product.categoria}
              urlImagen={product.urlImagen}
              estado={product.estado}
              isAdmin={isAdmin}
              onDelete={handleDeleteProduct}
              onEdit={() => handleEditProduct(product)}
            />
          ))
        )}
      </div>
      {showForm && isAdmin && (
        <AddProductForm
          onClose={handleFormClose}
          onSubmit={handleFormSubmit}
          initialData={productToEdit}
          isAdmin={isAdmin}
        />
      )}
      {showConfirmDialog && (
        <ConfirmDialog
          message="¿Está seguro de que desea eliminar este producto?"
          onConfirm={confirmDeleteProduct}
          onCancel={cancelDeleteProduct}
        />
      )}
    </div>
  );
};

export default ProductPage;