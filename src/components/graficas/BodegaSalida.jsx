import React, { useMemo } from "react";
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

const BodegaChart = ({ bodegas }) => {
  // Aseguramos que las fechas y cantidades son válidas
  const datos = useMemo(() => {
    return bodegas
      .filter((item) => item.fecha && item.cantidad > 0) // Filtramos los items sin fecha o con cantidad 0
      .map((item) => ({
        fecha: item.fecha,
        cantidad: item.cantidad,
      }));
  }, [bodegas]);

  return (
    <div className="product-chart">
      <h2>Gráfico de Salidas por Fecha</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={datos}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="fecha" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="cantidad" fill="#F3D301" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BodegaChart;
