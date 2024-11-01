import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import './formStyle.css';

const CreatePedido = () => {
    const navigate = useNavigate();
    const [proveedor, setProveedor] = useState('');
    const [cantidad, setCantidad] = useState('');
    const [producto, setProducto] = useState('');
    const [productos, setProductos] = useState([]);
    const [proveedores, setProveedores] = useState([]);
    const [fecha, setFecha] = useState('');
    const [estado, setEstado] = useState('');
    const estados = [
        { value: 'Pendiente', label: 'Pendiente' },
        { value: 'En Proceso', label: 'En Proceso' },
        { value: 'Recibido', label: 'Recibido' },
    ]; // Lista de estados del pedido

    // Cargar productos y proveedores al montar el componente
    useEffect(() => {
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

        fetchProductos();
        fetchProveedores();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const nuevoPedido = {
                proveedor,
                cantidad,
                producto,
                fecha,
                estado,
            };

            await api.post('/pedidos/', nuevoPedido);
            alert("Pedido creado exitosamente");
            navigate('/pedidos/'); // Redirige a la lista de pedidos
        } catch (error) {
            console.error("Error al crear el pedido:", error);
            alert("Error al crear el pedido");
        }
    };

    const handleCancel = () => {
        navigate('/pedidos/'); // Redirige a la lista de pedidos al cancelar
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Crear Pedido</h2>
            <select 
                value={proveedor} 
                onChange={e => setProveedor(e.target.value)} 
                required
            >
                <option value="">Selecciona un proveedor</option>
                {proveedores.map(prov => (
                    <option key={prov.id_proveedor} value={prov.id_proveedor}>
                        {prov.nombre_proveedor} {prov.apellidos_proveedor}
                    </option>
                ))}
            </select>
            <select 
                value={producto} 
                onChange={e => setProducto(e.target.value)} 
                required
            >
                <option value="">Selecciona un producto</option>
                {productos.map(prod => (
                    <option key={prod.id_producto} value={prod.id_producto}>
                        {prod.nombre_producto}
                    </option>
                ))}
            </select>
            <input 
                type="number" 
                placeholder="Cantidad" 
                onChange={(e) => setCantidad(e.target.value)} 
                required 
            />
            <input 
                type="date" 
                placeholder="Fecha" 
                onChange={(e) => setFecha(e.target.value)} 
                required 
            />
            <select 
                value={estado} 
                onChange={e => setEstado(e.target.value)} 
                required
            >
                <option value="">Selecciona un estado</option>
                {estados.map((estado) => (
                    <option key={estado.value} value={estado.value}>
                        {estado.label}
                    </option>
                ))}
            </select>
            <button type="submit">Crear Pedido</button>
            <button type="button" onClick={handleCancel} style={{ marginLeft: '10px' }}>Cancelar</button>
        </form>
    );
};

export default CreatePedido;
