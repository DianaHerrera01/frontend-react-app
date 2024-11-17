import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 
import './App.css';
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";  // Import useLocation here as well
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
import ListNota from './components/notas/ListNota';
import UpdateNota from './components/notas/UpdateNota';
import CreateNota from './components/notas/CreateNota';
import DeleteNota from './components/notas/DeleteNota';
import Header from './components/pagina/Header';
import Navigation from './components/pagina/Navigation';
import Footer from './components/pagina/Footer';
import LoginForm from './components/usuario/login';
import RegisterForm from './components/usuario/registro';
import Home from './components/pagina/Home';
import ListCategoria from './components/categoria/ListCategoria';
import Createategoria from './components/categoria/CreateCategoria';
import UpdateCategoria from './components/categoria/UpdateCategoria';
import DeleteCategoria from './components/categoria/DeleteCategoria';
import ListProductoServicio from './components/ProductoServicio/ListProductoServicio';
import CreateProductoServicio from './components/ProductoServicio/CreateProductoServicio';
import UpdateProductoServicio from './components/ProductoServicio/UpdateProductoServicio';
import DeleteProductoServicio from './components/ProductoServicio/DeleteProductoServicio';
import ListTipoDocumento from "./components/tipodocumento/ListTipoDocumento ";
import CreateTipoDocumento from "./components/tipodocumento/CreateTipoDocumento";
import UpdateTipoDocumento from "./components/tipodocumento/UpdateTipoDocumento";
import DeleteTipoDocumento from "./components/tipodocumento/DeleteTipoDocumento";
import ListTipoNota from "./components/tiponota/ListTipoNota";
import CreateTipoNota from "./components/tiponota/CreateTipoNota";
import UpdateTipoNota from "./components/tiponota/UpdateTipoNota";
import DeleteTipoNota from "./components/tiponota/DeleteTipoNota";
import ListUsuarios from "./components/usuario/ListUsuarios";
import CreateUsuario from "./components/usuario/CreateUsuario";
import UpdateUsuario from "./components/usuario/UpdateUsuario";
import DeleteUsuario from "./components/usuario/DeleteUsuario";

function App() {
  return (
    <Router>
      <AppWithRouter />
    </Router>
  );
}

function AppWithRouter() {
  const location = useLocation();

  const noNavRoutes = ["/", "/login", "/registro"];
  return (
    <div className="App">
      <Header />
      {/* Solo mostrar Navigation si la ruta no está en la lista noNavRoutes */}
      {!noNavRoutes.includes(location.pathname) && <Navigation />}
      <main>
        <Routes>
          <Route path="/" element={<LoginForm />} /> 
          <Route path="/login" element={<LoginForm />} />
          <Route path="/registro" element={<RegisterForm />} />
          <Route path="/home" element={<Home />} /> 
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
          <Route path="/notas" element={<ListNota/>} />
          <Route path="/nuevo-nota" element={<CreateNota/>} />
          <Route path="/editar-nota/:id_nota" element={<UpdateNota />} />
          <Route path="/eliminar-nota/:id_Nota" element={<DeleteNota/>} /> 
          <Route path="/categorias" element={<ListCategoria/>} />
          <Route path="/nueva-categoria" element={<Createategoria />} />
          <Route path="/editar-categoria/:categoriaID" element={<UpdateCategoria />} />
          <Route path="/eliminar-categoria/:categoriaID" element={<DeleteCategoria />} />
          <Route path="/productos-servicios" element={<ListProductoServicio />} />
          <Route path="/nuevo-producto-servicio" element={<CreateProductoServicio />} />
          <Route path="/editar-producto-servicio/:id_producto_servicio" element={<UpdateProductoServicio />} />
          <Route path="/eliminar-producto-servicio/:id_producto_servicio" element={<DeleteProductoServicio />} />
          <Route path="/tipos-documento" element={<ListTipoDocumento />} />
          <Route path="/nuevo-tipo-documento" element={<CreateTipoDocumento />} />
          <Route path="/tipos-documento/:id_tipo_docum" element={<UpdateTipoDocumento />} />
          <Route path="/eliminar-tipo-documento/:id_tipo_docum" element={<DeleteTipoDocumento />} />
          <Route path="/tipo-nota" element={<ListTipoNota />} />
          <Route path="/nuevo-tipo-nota" element={<CreateTipoNota />} />
          <Route path="/editar-tipo-nota/:tipoNotaID" element={<UpdateTipoNota />} />
          <Route path="/eliminar-tipo-nota/:tipoNotaID" element={<DeleteTipoNota />} />
          <Route path="/usuarios" element={<ListUsuarios />} />
          <Route path="/nuevo-usuario" element={<CreateUsuario/>} />
          <Route path="/editar-usuario/:pk" element={<UpdateUsuario/>} />
          <Route path="/eliminar-usuario/:pk" element={<DeleteUsuario/>} />
          
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
