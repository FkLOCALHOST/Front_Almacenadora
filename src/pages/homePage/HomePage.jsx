import React, { useEffect, useState } from "react";
import LoteCard from "../../components/lote/LoteCard";
import AddLoteForm from "../../components/lote/AddLoteForm";
import ConfirmDialog from "../../components/cliente/ConfirmDialog";
import ProductoMasVendido from "../../components/stats/mostSold";
import ProductoMenosVendido from "../../components/stats/leastSold";
import InventarioTotal from "../../components/stats/inventarioT";
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
  totalInventario, 
} from "../../services/api";

const HomePage = () => {
  const [lotes, setLotes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [loteToDelete, setLoteToDelete] = useState(null);
  const [loteToEdit, setLoteToEdit] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [inventarioTotal, setInventarioTotal] = useState(0); // Estado para el precio total del inventario
  const [searchTerm, setSearchTerm] = useState('');


  const allProductos = lotes.flatMap((l) => l.productos || []);

  const {
    fechasConMasSalidas,
    fechaConMasSalidas,
    fechaConMenosSalidas,
    toggleOrder,
  } = useBodegas();

  const {
    productosOrdenados,
    toggleOrder: toggleOrderProductos,
    ordenarPor,
  } = useProductos(allProductos);

  const {
    trabajadoresOrdenados,
    toggleOrder: toggleOrderTrabajadores,
    ordenarPor: ordenarPorTrabajadores,
  } = useTrabajadores();

  // Efecto para verificar si el usuario es administrador
  useEffect(() => {
    const trabajadorDetails = localStorage.getItem("Trabajador");
    if (trabajadorDetails) {
      const userDetails = JSON.parse(trabajadorDetails);
      if (userDetails?.userDetails?.role === "ADMIN_ROLE") {
        setIsAdmin(true);
      }
    }
  }, []);

  // Efecto para obtener los lotes
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

  // Efecto para obtener el precio total del inventario
  useEffect(() => {
    const fetchInventarioTotal = async () => {
      try {
        const response = await totalInventario(); // Hacemos la llamada a la API
        if (!response.error && response.data) {
          setInventarioTotal(response.data.precioTotal); // Asumimos que el precio total viene en response.data.precioTotal
        } else {
          console.error("Error al obtener el total del inventario");
        }
      } catch (error) {
        console.error("Error en la solicitud:", error);
      }
    };

    fetchInventarioTotal(); // Llamamos a la API al montar el componente
  }, []); // Este useEffect se ejecuta solo una vez

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
              lote._id === loteToEdit._id ? { ...lote, ...loteData } : lote
            )
          );
          handleRefresh();
        } else {
          setErrorMessage("Error al actualizar el lote.");
        }
      } else {
        const response = await crearLote(loteData);
        if (!response.error) {
          setLotes((prevLotes) => [...prevLotes, response.data]);
          handleRefresh();
        } else {
          setErrorMessage("Error al agregar el lote.");
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

  const handleRefresh = () => {
    window.location.reload();
  };

  const filteredLotes = lotes.filter((lote) => {
    const numero = lote.numeroLote?.toLowerCase() || '';
    const producto = lote.producto?.toLowerCase() || '';
    return (
      numero.includes(searchTerm.toLowerCase()) ||
    producto.includes(searchTerm.toLowerCase())
    );
  });

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

  const lotesFiltrados = lotes.filter((lote) =>
    lote.numeroLote?.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
          <input className="search-bar-store"
            type="text"
            placeholder="Buscar lote"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            />
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
            lotesFiltrados.map((lote) => (
              <LoteCard
                key={lote._id}
                id={lote._id}
                numeroLote={lote.numeroLote}
                cantidad={lote.cantidad}
                fechaCaducidad={lote.fechaCaducidad}
                productos={lote.productos}
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
