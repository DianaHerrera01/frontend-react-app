import React from 'react';

function Navigation() {
    const handleDropdownToggle = (event) => {
        const dropdown = event.currentTarget.nextElementSibling;
        dropdown.classList.toggle('show'); // Alterna la clase 'show' para mostrar/ocultar el menú
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light">
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <a className="nav-link" href="/">Inicio</a>
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
                        </div>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Navigation;
