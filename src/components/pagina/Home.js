import React from 'react';
import './Home.css'; 

function Home() {
    return (
        <div className="container-fluid">
            <section className="section-content">
                <div className="row">
                    <div className="col-md-12">
                        <div className="sistema">
                            <h1>Sistema COINVE: Control de Inventario y Gestión de Ventas</h1>
                            <div className="row">
                                <div className="col-md-4">
                                    <img src="/Inven_Bodega.png" alt="Imagen Bodega" />
                                </div>
                                <div className="col-md-8">
                                    <p>
                                        Descubre cómo el Sistema COINVE de TecnoFácil te ayuda a optimizar la gestión de tu inventario y potenciar tus ventas. Con nuestra solución integral, podrás controlar eficientemente el stock de productos, gestionar proveedores de manera efectiva, procesar pedidos de forma ágil y obtener informes detallados sobre tus ventas y rendimiento. Confía en nosotros para simplificar tus procesos diarios y maximizar la productividad de tu negocio.
                                    </p>
                                </div>
                            </div>
                            <div className="modulos">
                                <div className="row">
                                    <div className="col-md-6">
                                        <article>
                                            <h4>INVENTARIO</h4>
                                            <img src="/Icono_Inven.png" alt="Icono inventario" />
                                            <p>
                                                Con el módulo de inventario de COINVE, podrás llevar un registro detallado de tus productos, proveedores, entradas de productos, pedidos y devoluciones. Controla eficientemente tu inventario y accede a informes precisos sobre tus existencias para una gestión óptima.
                                            </p>
                                        </article>
                                    </div>
                                    <div className="col-md-6">
                                        <article>
                                            <h4>VENTAS</h4>
                                            <img src="/Icono_Venta.png" alt="Icono ventas" />
                                            <p>
                                                Optimiza tus ventas con el módulo de ventas de COINVE. Registra a tus clientes, emite facturas y notas de crédito/débito de forma fácil y rápida. Accede a informes detallados sobre tus ventas para comprender mejor el rendimiento de tu negocio y tomar decisiones estratégicas.
                                            </p>
                                        </article>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Home;
