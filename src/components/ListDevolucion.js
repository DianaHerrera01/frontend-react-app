import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api'; 
import './listStyle.css';

const ListDevoluciones = () => {
    const [devoluciones, setDevoluciones] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDevoluciones = async () => {
            try {
                const response = await api.get('/devoluciones/');
                setDevoluciones(response.data);
            } catch (error) {
                console.error("Hubo un error al obtener las devoluciones:", error);
            }
        };

        fetchDevoluciones();
    }, []);

    const handleDelete = (id_devolucion) => {
        navigate(`/eliminar-devolucion/${id_devolucion}`);
    };

    const handleEdit = (id_devolucion) => {
        navigate(`/editar-devolucion/${id_devolucion}`);
    };

    const handleCreate = () => {
        navigate('/nuevo-devolucion');
    };

    return (
        <div>
            <h2>Gestión de Devoluciones</h2>
            <button onClick={handleCreate} className="btn btn-success">Crear Devolución</button>
            <table className="table">
                <thead>
                    <tr>
                        <th>ID Devolución</th>
                        <th>Producto</th>
                        <th>Cantidad</th>
                        <th>Motivo</th>
                        <th>Fecha de Devolución</th>
                        <th>Proveedor</th>
                        <th>Precio Unitario</th>
                        <th>Precio Total</th>
                        <th className="actions">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {devoluciones.map(devolucion => (
                        <tr key={devolucion.id_devolucion}>
                            <td>{devolucion.id_devolucion}</td>
                            <td>{devolucion.producto.nombre_producto}</td>
                            <td>{devolucion.cantidad}</td>
                            <td>{devolucion.motivo || "N/A"}</td>
                            <td>{new Date(devolucion.fecha_devolucion).toLocaleDateString()}</td>
                            <td>{devolucion.proveedor.nombre_proveedor} {devolucion.proveedor.apellidos_proveedor}</td>
                            <td>${devolucion.precio_unidad_compra}</td>
                            <td>${devolucion.precio_total_compra}</td>
                            <td className="actions">
                                <button onClick={() => handleEdit(devolucion.id_devolucion)} className="btn btn-primary">Editar</button>
                                <button onClick={() => handleDelete(devolucion.id_devolucion)} className="btn btn-danger btnEliminacion">Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ListDevoluciones;
