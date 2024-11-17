import React from 'react';
import { useNavigate } from 'react-router-dom'; // Importamos useNavigate para redirigir

function Navigation() {
    const navigate = useNavigate(); // Hook para redirigir

    const handleDropdownToggle = (event) => {
        const dropdown = event.currentTarget.nextElementSibling;
        dropdown.classList.toggle('show'); // Alterna la clase 'show' para mostrar/ocultar el menú
    };

    const handleLogout = () => {
        // Aquí puedes agregar la lógica de cierre de sesión 
        navigate('/'); // Redirige al usuario a la página de inicio
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light">
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                {/* Enlaces de navegación alineados a la izquierda */}
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <a className="nav-link" href="/home">Inicio</a>
                    </li>
                    <li className="nav-item dropdown">
                        <button className="nav-link dropdown-toggle" type="button" onClick={handleDropdownToggle} aria-haspopup="true" aria-expanded="false">
                            Inventario
                        </button>
                        <div className="dropdown-menu" aria-labelledby="navbarDropdownInventario">
                            <a className="dropdown-item" href="/productos">Producto</a>
                            <a className="dropdown-item" href="/proveedores">Proveedor</a>
                            <a className="dropdown-item" href="/entradas">Entrada de producto</a>
                            <a className="dropdown-item" href="/pedidos">Pedido</a>
                            <a className="dropdown-item" href="/devoluciones">Devolución</a>
                        </div>
                    </li>
                    <li className="nav-item dropdown">
                        <button className="nav-link dropdown-toggle" type="button" onClick={handleDropdownToggle} aria-haspopup="true" aria-expanded="false">
                            Ventas
                        </button>
                        <div className="dropdown-menu" aria-labelledby="navbarDropdownVentas">
                            <a className="dropdown-item" href="/clientes">Cliente</a>
                            <a className="dropdown-item" href="/facturas">Factura</a>
                            <a className="dropdown-item" href="/notas">Nota Crédito/Débito</a>
                        </div>
                    </li>
                </ul>
            </div>

            {/* Enlaces a la derecha */}
            <ul className="navbar-nav ml-auto"> {/* ml-auto alinea a la derecha */}
                <li className="nav-item">
                    <a className="nav-link" href="/usuarios">
                        Usuarios
                    </a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="/" onClick={handleLogout}>
                        Cerrar sesión
                    </a>
                </li>
            </ul>
        </nav>
    );
}

export default Navigation;
