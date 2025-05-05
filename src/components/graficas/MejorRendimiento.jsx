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

const WorkerChart = ({ trabajadores }) => {
  const [ordenarPor, setOrdenarPor] = useState("mayorRendimiento");

  const ordenarTrabajadores = () => {
    return [...trabajadores].sort((a, b) => {
      if (ordenarPor === "mayorRendimiento") {
        return (b.rendimientoT || 0) - (a.rendimientoT || 0);
      } else {
        return (a.rendimientoT || 0) - (b.rendimientoT || 0);
      }
    });
  };

  const datos = ordenarTrabajadores()
    .slice(0, 10)
    .map((t) => ({
      nombre: t.nombreT,
      rendimiento: t.rendimientoT || 0,
    }));

  const toggleOrder = () => {
    setOrdenarPor((prev) =>
      prev === "mayorRendimiento" ? "menorRendimiento" : "mayorRendimiento"
    );
  };

  return (
    <div className="product-chart">
      <div className="lotes-header">
        <h2 className="lotes-title">Gráfico de Rendimiento de Trabajadores</h2>
        <button onClick={toggleOrder} className="toggle-order-button">
          {ordenarPor === "mayorRendimiento"
            ? "Mostrar Menor Rendimiento"
            : "Mostrar Mayor Rendimiento"}
        </button>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={datos}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="nombre" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="rendimiento" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default WorkerChart;