import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api';
import '../listStyle.css';

const ListProductoServicio = () => {
    const [productosServicios, setProductosServicios] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProductoServicios = async () => {
            try {
                const response = await api.get('/productos-servicios/');
                setProductosServicios(response.data);
            } catch (error) {
                console.error("Hubo un error al obtener los productos o servicios:", error);
            }
        };

        fetchProductoServicios();
    }, []);

    const handleDelete = (idProductoServicio) => {
        navigate(`/eliminar-producto-servicio/${idProductoServicio}`);
    };

    const handleEdit = (idProductoServicio) => {
        navigate(`/editar-producto-servicio/${idProductoServicio}`);
    };

    const handleCreate = () => {
        navigate('/nuevo-producto-servicio');
    };

    return (
        <div>
            <h2>Gestión de Productos y Servicios</h2>
            <button onClick={handleCreate} className="btn btn-success">Crear Producto/Servicio</button>
            <table className="table">
                <thead>
                    <tr>
                        <th>ID Producto/Servicio</th>
                        <th>Nombre Producto/Servicio</th>
                        <th className="actions">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {productosServicios.map(productoServicio => (
                        <tr key={productoServicio.id_producto_servicio}>
                            <td>{productoServicio.id_producto_servicio}</td>
                            <td>{productoServicio.nom_producto_serv}</td>
                            <td className="actions">
                                <button onClick={() => handleEdit(productoServicio.id_producto_servicio)} className="btn btn-primary">Editar</button>
                                <button onClick={() => handleDelete(productoServicio.id_producto_servicio)} className="btn btn-danger btnEliminacion">Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ListProductoServicio;
