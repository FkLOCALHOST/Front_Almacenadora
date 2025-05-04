import React, { useEffect, useState } from "react";
import LoteCard from "../../components/lote/LoteCard";
import AddLoteForm from "../../components/lote/AddLoteForm";
import ConfirmDialog from "../../components/cliente/ConfirmDialog";
import ProductoMasVendido from "../../components/stats/mostSold";
import ProductoMenosVendido from "../../components/stats/leastSold";
import InventarioTotal from "../../components/stats/inventarioT";
import LotesPorVencer from "../../components/stats/lotesPorVencer";
import LotesVencidos from "../../components/stats/lotesVencidos";
import ProductChart from "../../components/graficas/ProductGrafic";
import WorkerChart from "../../components/graficas/MejorRendimiento";
import BodegaChart from "../../components/graficas/BodegaSalida";
import useProductos from "../../shared/hooks/useProductos";
import useTrabajadores from "../../shared/hooks/useTRabajadores";
import useBodegas from "../../shared/hooks/useOrderBodega";
import "../../assets/css/HomePage.css";
import {
  listarLote,
  eliminarLote,
  actualizarLote,
  crearLote,
  generarPDFLotes,

  listarPorCantidadVentas, // Endpoint para productos top de ventas
  // obtenerInventarioTotal,  // Endpoint para inventario total de dinero
  // obtenerLotesPorVencer,   // Endpoint para lotes por vencer
} from '../../services/api';
import './HomePage.css';

const HomePage = () => {
  const [lotes, setLotes] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [loteToDelete, setLoteToDelete] = useState(null);
  const [loteToEdit, setLoteToEdit] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [inventarioTotal, setInventarioTotal] = useState(0);
  const [lotesPorVencer, setLotesPorVencer] = useState(0);

  const allProductos = lotes.flatMap((l) => l.productos || []);

  const {
    fechasConMasSalidas,
    fechaConMasSalidas,
    fechaConMenosSalidas,
    errorMessage: bodegaErrorMessage,
    toggleOrder,
  } = useBodegas();

  const {
    productosOrdenados,
    errorMessage: productosError,
    toggleOrder: toggleOrderProductos,
    ordenarPor,
  } = useProductos(allProductos);

  const {
    trabajadoresOrdenados,
    errorMessage: trabajadoresError,
    toggleOrder: toggleOrderTrabajadores,
    ordenarPor: ordenarPorTrabajadores,
  } = useTrabajadores();

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

    const fetchData = async () => {
      const productosResponse = await listarPorCantidadVentas();
      if (!productosResponse.error) {
        setProductosTop(productosResponse.data);
      } else {
        setErrorMessage("Error al cargar productos top.");
      }

      /*const inventarioResponse = await obtenerInventarioTotal();
      if (!inventarioResponse.error) {
        setInventarioTotal(inventarioResponse.data);
      } else {
        setErrorMessage("Error al cargar inventario total.");
      }

      const lotesVencerResponse = await obtenerLotesPorVencer();
      if (!lotesVencerResponse.error) {
        setLotesPorVencer(lotesVencerResponse.data);
      } else {
        setErrorMessage("Error al cargar lotes por vencer.");
      }*/
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchLotes = async () => {
      const response = await listarLote();
      if (!response.error) {
        if (response.data.lotes.length === 0) {
          setErrorMessage("Sin datos en la base de datos.");
        } else {
          setLotes(response.data.lotes);
        }
      } else {
        setErrorMessage("Error al cargar los lotes.");
      }
    };

    fetchLotes();
  }, []);

  const handleAddLote = () => {
    setLoteToEdit(null);
    setShowForm(true);
  };

  const handleEditLote = (lote) => {
    setLoteToEdit(lote);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setLoteToEdit(null);
  };

  const handleFormSubmit = async (loteData) => {
    try {
      if (loteToEdit) {
        const response = await actualizarLote(loteToEdit._id, loteData);
        if (!response.error && response.data.success) {
          setLotes((prevLotes) =>
            prevLotes.map((lote) =>
              lote._id === loteToEdit._id ? response.data.lote : lote
            )
          );
        } else {
          setErrorMessage(response.data?.msg || "Error al actualizar el lote.");
        }
      } else {
        const response = await crearLote(loteData);
        if (!response.error && response.data.success) {
          setLotes((prevLotes) => [...prevLotes, response.data.lote]);
        } else {
          setErrorMessage(response.data?.msg || "Error al agregar el lote.");
        }
      }
    } catch (error) {
      setErrorMessage("Error al conectar con el servidor.");
    }
    setShowForm(false);
    setLoteToEdit(null);
  };

  const handleDeleteLote = (id) => {
    setLoteToDelete(id);
    setShowConfirmDialog(true);
  };

  const confirmDeleteLote = async () => {
    try {
      const response = await eliminarLote(loteToDelete);
      if (!response.error) {
        setLotes((prevLotes) =>
          prevLotes.filter((lote) => lote._id !== loteToDelete)
        );
      } else {
        setErrorMessage("Error al eliminar el lote.");
      }
    } catch (error) {
      setErrorMessage("Error al conectar con el servidor.");
    }
    setShowConfirmDialog(false);
    setLoteToDelete(null);
  };

  const cancelDeleteClient = () => {
    setShowConfirmDialog(false);
    setLoteToDelete(null);
  };

  const handleGenerateReport = async () => {
    try {
      const response = await generarPDFLotes();
      if (!response.error) {
        const blob = response.data;
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "Lotes.pdf";
        a.click();
        window.URL.revokeObjectURL(url);
      } else {
        setErrorMessage("Error al generar el informe.");
      }
    } catch (error) {
      setErrorMessage("Error al conectar con el servidor.");
    }
  };

  return (
    <div>
      <h1>Bienvenido a tu Almacenadora</h1>

      <div className="stats-cards">
        <ProductoMasVendido productoMasVendido={productosOrdenados[0]} />
        <ProductoMenosVendido
          productoMenosVendido={
            productosOrdenados[productosOrdenados.length - 1]
          }
        />
        <InventarioTotal inventarioTotal={inventarioTotal} />
        <LotesPorVencer lotesPorVencer={lotesPorVencer} />
        <LotesVencidos lotes={lotes} />
      </div>

      <div className="stats-cards">
        <p>
          <strong>Fecha con más salidas:</strong> {fechaConMasSalidas.fecha} (
          {fechaConMasSalidas.cantidad} salidas)
        </p>
        <p>
          <strong>Fecha con menos salidas:</strong> {fechaConMenosSalidas.fecha}{" "}
          ({fechaConMenosSalidas.cantidad} salidas)
        </p>
      </div>

      <div className="product-chart">
        <ProductChart productos={productosOrdenados} />
      </div>
      <div className="product-chart">
          <BodegaChart bodegas={fechasConMasSalidas} />
      </div>

      <div className="product-chart">
        <button onClick={toggleOrder}>
          {ordenarPor === "mejorRendimiento"
            ? "Mostrar Peor Rendimiento"
            : "Mostrar Mejor Rendimiento"}
        </button>
        {isAdmin && <WorkerChart trabajadores={trabajadoresOrdenados} />}
      </div>

      <div className="client-page-container">
        <div className="clients-header">
          <h1 className="clients-title">Lotes</h1>
          <div className="clients-header-buttons">
            {isAdmin && (
              <button className="add-client-button" onClick={handleAddLote}>
                Agregar Lote
              </button>
            )}
            <button className="report-button" onClick={handleGenerateReport}>
              Informe de Lotes
            </button>
          </div>
        </div>

        <div className="clients-grid">
          {errorMessage ? (
            <p className="error-message">{errorMessage}</p>
          ) : (
            lotes
              .filter((lote) => lote.estado)
              .map((lote) => (
                <LoteCard
                  key={lote._id}
                  id={lote._id}
                  numeroLote={lote.numeroLote}
                  cantidad={lote.cantidad}
                  fechaCaducidad={lote.fechaCaducidad}
                  productos={lote.productos || []}
                  estado={lote.estado}
                  isAdmin={isAdmin}
                  onDelete={handleDeleteLote}
                  onEdit={() => handleEditLote(lote)}
                />
              ))
          )}
        </div>

        {showForm && isAdmin && (
          <AddLoteForm
            onClose={handleFormClose}
            onSubmit={handleFormSubmit}
            initialData={loteToEdit}
            isAdmin={isAdmin}
          />
        )}
        {showConfirmDialog && (
          <ConfirmDialog
            message="¿Está seguro de que desea eliminar este lote?"
            onConfirm={confirmDeleteLote}
            onCancel={cancelDeleteClient}
          />
        )}
      </div>
    </div>
  );
};

export default HomePage;
