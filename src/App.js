import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ListProducto from './components/producto/ListProducto';
import CreateProducto from './components/producto/CreateProducto';
import UpdateProducto from './components/producto/UpdateProducto';
import DeleteProducto from './components/producto/DeleteProducto';
import ListProveedor from './components/proveedor/ListProveedor';
import CreateProveedor from './components/proveedor/CreateProveedor';
import UpdateProveedor from "./components/proveedor/UpdateProveedor";
import DeleteProveedor from './components/proveedor/DeleteProveedor';
import ListPedido from './components/pedido/ListPedido';
import CreatePedido from './components/pedido/CreatePedido';
import UpdatePedido from './components/pedido/UpdatePedido';
import DeletePedido from './components/pedido/DeletePedido';
import ListEntrada from './components/entrada/ListEntrada';
import CreateEntrada from './components/entrada/CreateEntrada';
import UpdateEntrada from './components/entrada/UpdateEntrada ';
import DeleteEntrada from './components/entrada/DeleteEntrada';
import ListDevolucion from './components/devolucion/ListDevolucion';
import CreateDevolucion from './components/devolucion/CreateDevolucion ';
import UpdateDevolucion from './components/devolucion/UpdateDevolucion';
import DeleteDevolucion from './components/devolucion/DeleteDevolucion';
import ListCliente from './components/cliente/ListCliente';
import CreateCliente from './components/cliente/CreateCliente';
import UpdateCliente from './components/cliente/UpdateCliente';
import DeleteCliente from './components/cliente/DeleteCliente';
import ListFactura from './components/factura/ListFactura';
import CreateFactura from './components/factura/CreateFactura';
import UpdateFactura from './components/factura/UpdateFactura';
import DeleteFactura from './components/factura/DeleteFactura';
import Header from './components/pagina/Header';
import Navigation from './components/pagina/Navigation';
import Footer from './components/pagina/Footer';
import Home from './components/pagina/Home';



function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Navigation />
        
        <main>
          <Routes>
            <Route path="/" element={<Home />} /> 
            <Route path="/productos" element={<ListProducto />} />
            <Route path="/nuevo" element={<CreateProducto />} />
            <Route path="/editar/:id_producto" element={<UpdateProducto />} /> 
            <Route path="/eliminar/:id_producto" element={<DeleteProducto />} /> 
            <Route path="/proveedores" element={<ListProveedor />} />
            <Route path="/nuevo-proveedor" element={<CreateProveedor/>} />
            <Route path="/editar-proveedor/:id_proveedor" element={<UpdateProveedor />} /> 
            <Route path="/eliminar-proveedor/:id_proveedor" element={<DeleteProveedor />} /> 
            <Route path="/pedidos" element={<ListPedido />} />
            <Route path="/nuevo-pedido" element={<CreatePedido/>} />
            <Route path="/editar-pedido/:id_orden_pedido" element={<UpdatePedido />} />
            <Route path="/eliminar-pedido/:id_orden_pedido" element={<DeletePedido/>} /> 
            <Route path="/entradas" element={<ListEntrada />} />
            <Route path="/nuevo-entrada" element={<CreateEntrada/>} />
            <Route path="/editar-entrada/:id_entrada" element={<UpdateEntrada/>} /> 
            <Route path="/eliminar-entrada/:id_entrada" element={<DeleteEntrada/>} /> 
            <Route path="/devoluciones" element={<ListDevolucion />} />
            <Route path="/nuevo-devolucion" element={<CreateDevolucion/>} />
            <Route path="/editar-devolucion/:id_devolucion" element={<UpdateDevolucion/>} /> 
            <Route path="/eliminar-devolucion/:id_devolucion" element={<DeleteDevolucion />} /> 
            <Route path="/clientes" element={<ListCliente />} />
            <Route path="/nuevo-cliente" element={<CreateCliente/>} />
            <Route path="/editar-cliente/:id_cliente" element={<UpdateCliente/>} /> 
            <Route path="/eliminar-cliente/:id_cliente" element={<DeleteCliente />} /> 
            <Route path="/facturas" element={<ListFactura />} />
            <Route path="/nuevo-factura" element={<CreateFactura/>} />
            <Route path="/editar-factura/:id_factura" element={<UpdateFactura/>} /> 
            <Route path="/eliminar-factura/:id_factura" element={<DeleteFactura/>} /> 
          </Routes>
        </main>
        
        <Footer />
      </div>
    </Router>
  );
}

export default App;
