import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../api'; 
import '../formStyle.css';

const UpdatePedido = () => {
    const { id_orden_pedido } = useParams();
    const navigate = useNavigate();
    
    const [pedido, setPedido] = useState({
        proveedor: null,
        producto: null,
        cantidad: 0,
        estado: 'Pendiente',
    });
    
    const [productos, setProductos] = useState([]);
    const [proveedores, setProveedores] = useState([]);

    useEffect(() => {
        const fetchPedido = async () => {
            try {
                const response = await api.get(`/pedidos/${id_orden_pedido}/`);
                setPedido(response.data);
            } catch (error) {
                console.error("Error al cargar el pedido:", error);
                alert('No se pudo cargar el pedido');
            }
        };

        const fetchProductos = async () => {
            try {
                const response = await api.get('/productos/');
                setProductos(response.data);
            } catch (error) {
                console.error("Error al cargar los productos:", error);
            }
        };

        const fetchProveedores = async () => {
            try {
                const response = await api.get('/proveedores/');
                setProveedores(response.data);
            } catch (error) {
                console.error("Error al cargar los proveedores:", error);
            }
        };

        fetchPedido();
        fetchProductos();
        fetchProveedores();
    }, [id_orden_pedido]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const updatedPedido = {
                proveedor: pedido.proveedor ? pedido.proveedor.id_proveedor : null,
                producto: pedido.producto ? pedido.producto.id_producto : null,
                cantidad: pedido.cantidad,
                estado: pedido.estado,
            };

            console.log('Pedido a actualizar:', updatedPedido);
            await api.put(`/pedidos/${id_orden_pedido}/`, updatedPedido);
            alert('Pedido actualizado correctamente');
            navigate('/pedidos/'); // Redirigir a la lista de pedidos
        } catch (error) {
            console.error('Error al actualizar el pedido:', error.response ? error.response.data : error.message);
            alert('Error al actualizar el pedido');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h3>Editar Pedido</h3>
            <select
                value={pedido.proveedor ? pedido.proveedor.id_proveedor : ''}
                onChange={e => setPedido({ ...pedido, proveedor: proveedores.find(p => p.id_proveedor === e.target.value) })}
                required
            >
                <option value="">Selecciona un proveedor</option>
                {proveedores.map(proveedor => (
                    <option key={proveedor.id_proveedor} value={proveedor.id_proveedor}>
                        {proveedor.nombre_proveedor} {proveedor.apellidos_proveedor}
                    </option>
                ))}
            </select>
            <select
                value={pedido.producto ? pedido.producto.id_producto : ''}
                onChange={e => setPedido({ ...pedido, producto: productos.find(p => p.id_producto === e.target.value) })}
                required
            >
                <option value="">Selecciona un producto</option>
                {productos.map(producto => (
                    <option key={producto.id_producto} value={producto.id_producto}>
                        {producto.nombre_producto}
                    </option>
                ))}
            </select>
            <input
                type="number"
                placeholder="Cantidad"
                value={pedido.cantidad}
                onChange={e => setPedido({ ...pedido, cantidad: parseInt(e.target.value) })}
                required
            />
            <select
                value={pedido.estado}
                onChange={e => setPedido({ ...pedido, estado: e.target.value })}
                required
            >
                <option value="Pendiente">Pendiente</option>
                <option value="En Proceso">En Proceso</option>
                <option value="Recibido">Recibido</option>
            </select>
            <button type="submit">Actualizar Pedido</button>
            <button type="button" onClick={() => navigate('/pedidos/')}>Cancelar</button>
        </form>
    );
};

export default UpdatePedido;
