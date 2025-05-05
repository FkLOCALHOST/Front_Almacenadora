import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import "../../assets/css/HomePage.css";

const ProductChart = ({ productos }) => {
  const [ordenarPor, setOrdenarPor] = useState("masVendido"); // Inicializamos en 'masVendido'

  // Función para ordenar los productos según el criterio seleccionado
  const ordenarProductos = () => {
    return [...productos].sort((a, b) => {
      if (ordenarPor === "masVendido") {
        return (b.cantidadVenta || 0) - (a.cantidadVenta || 0);
      } else {
        return (a.cantidadVenta || 0) - (b.cantidadVenta || 0);
      }
    });
  };

  const datos = ordenarProductos()
    .slice()
    .map((producto) => ({
      nombre: producto.nombreProducto,
      cantidad: producto.cantidadVenta || 0,
    }));

  const toggleOrder = () => {
    setOrdenarPor((prevOrdenarPor) =>
      prevOrdenarPor === "masVendido" ? "menosVendido" : "masVendido"
    );
  };

  return (
    <div className="product-chart">
      {" "}
      {/* Aplicamos la clase .lote-card para la tarjeta */}
      <div className="lotes-header">
        <h2 className="lotes-title">Gráfico de Productos Vendidos</h2>
        <button
          onClick={toggleOrder}
          className="toggle-order-button" // Usamos la clase toggle-order-button
        >
          {ordenarPor === "masVendido"
            ? "Mostrar Menos Vendidos"
            : "Mostrar Más Vendidos"}
        </button>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={datos}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="nombre" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="cantidad" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ProductChart;
