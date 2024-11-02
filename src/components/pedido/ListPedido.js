import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import api from '../../api'; 
import '../listStyle.css'; 

const ListPedidos = () => {
    const [pedidos, setPedidos] = useState([]);
    const navigate = useNavigate(); // Inicializa useNavigate

    useEffect(() => {
        const fetchPedidos = async () => {
            try {
                const response = await api.get('/pedidos/'); 
                setPedidos(response.data);
            } catch (error) {
                console.error("Hubo un error al obtener los pedidos:", error);
            }
        };

        fetchPedidos();
    }, []);

    const handleDelete = (id_orden_pedido) => {
        navigate(`/eliminar-pedido/${id_orden_pedido}`); // Redirigir a DeletePedido
    };

    const handleEdit = (id_orden_pedido) => {
        navigate(`/editar-pedido/${id_orden_pedido}`); 
    };

    const handleCreate = () => {
        navigate('/nuevo-pedido'); // Redirige al formulario de creación de pedido
    };
    
    return (
        <div>
            <h2>Gestión de Pedidos</h2>
            <button onClick={handleCreate} className="btn btn-success">Crear Pedido</button>
            <table className="table">
                <thead>
                    <tr>
                        <th>ID Pedido</th>
                        <th>Producto</th>
                        <th>Proveedor</th>
                        <th>Cantidad</th>
                        <th>Estado</th>
                        <th className="actions">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {pedidos.map(pedido => (
                        <tr key={pedido.id_orden_pedido}>
                            <td>{pedido.id_orden_pedido}</td>
                            <td>{pedido.producto.nombre_producto}</td>
                            <td>{pedido.proveedor.nombre_proveedor} {pedido.proveedor.apellidos_proveedor}</td>
                            <td>{pedido.cantidad}</td>
                            <td>{pedido.estado}</td>
                            <td className="actions">
                                <button onClick={() => handleEdit(pedido.id_orden_pedido)} className="btn btn-primary">Editar</button>
                                <button onClick={() => handleDelete(pedido.id_orden_pedido)} className="btn btn-danger btnEliminacion">Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ListPedidos;
