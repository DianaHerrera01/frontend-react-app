import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api'; 
import './listStyle.css'; 

const ListFacturas = () => {
    const [facturas, setFacturas] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchFacturas = async () => {
            try {
                const response = await api.get('/facturas/'); 
                setFacturas(response.data);
            } catch (error) {
                console.error("Hubo un error al obtener las facturas:", error);
            }
        };
        fetchFacturas();
    }, []);

    const handleDelete = (id_factura) => {
        navigate(`/eliminar-factura/${id_factura}`); // Redirigir a la página de eliminación de factura
    };

    const handleEdit = (id_factura) => {
        navigate(`/editar-factura/${id_factura}`); 
    };

    const handleCreate = () => {
        navigate('/nuevo-factura'); // Redirige al formulario de creación de factura
    };

    return (
        <div>
            <h2>Gestión de Facturas</h2>
            <button onClick={handleCreate} className="btn btn-success">Crear Factura</button>
            <table className="table">
                <thead>
                    <tr>
                        <th>ID Factura</th>
                        <th>Cliente</th>
                        <th>Tipo de Documento</th>
                        <th>Número de Documento</th>
                        <th>Fecha de Emisión</th>
                        <th>Detalles</th>
                        <th>Precio Total</th>
                        <th className="actions">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {facturas.map(factura => (
                        <tr key={factura.id_factura}>
                            <td>{factura.id_factura}</td>
                            <td>{factura.cliente ? `${factura.cliente.nombre_cliente} ${factura.cliente.apellidos_cliente}` : 'N/A'}</td>
                            <td>{factura.tipo_documento ? factura.tipo_documento.nom_tipo_doc : 'N/A'}</td>
                            <td>{factura.numero_documento}</td>
                            <td>{factura.fecha_emision}</td>
                            <td>
                                {factura.detalles.length > 0 ? (
                                    <ul>
                                        {factura.detalles.map((detalle) => (
                                            <li key={detalle.producto.id_producto}>
                                                {detalle.producto.nombre_producto} - Cantidad: {detalle.cantidad} - Total: {detalle.precio_total_venta} COP
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <span>No hay detalles disponibles</span>
                                )}
                            </td>
                            <td>{factura.precio_total_venta} COP</td>
                            <td className="actions">
                                <button onClick={() => handleEdit(factura.id_factura)} className="btn btn-primary">Editar</button>
                                <button onClick={() => handleDelete(factura.id_factura)} className="btn btn-danger btnEliminacion">Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ListFacturas;
