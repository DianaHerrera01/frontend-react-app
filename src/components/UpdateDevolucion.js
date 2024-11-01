import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api';
import './formStyle.css';

const UpdateDevolucion = () => {
    const { id_devolucion } = useParams();
    const navigate = useNavigate();

    const [devolucion, setDevolucion] = useState({
        producto: null,
        cantidad: 0,
        motivo: '',
        proveedor: null,
        fecha_devolucion: ''
    });

    const [productos, setProductos] = useState([]);
    const [proveedores, setProveedores] = useState([]);

    useEffect(() => {
        // Cargar datos de la devolución, productos y proveedores
        const fetchDevolucion = async () => {
            try {
                const response = await api.get(`/devoluciones/${id_devolucion}/`);
                setDevolucion(response.data);
            } catch (error) {
                console.error("Error al cargar la devolución:", error);
                alert('No se pudo cargar la devolución');
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

        fetchDevolucion();
        fetchProductos();
        fetchProveedores();
    }, [id_devolucion]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const updatedDevolucion = {
                producto: devolucion.producto ? devolucion.producto.id_producto : null,
                cantidad: devolucion.cantidad,
                motivo: devolucion.motivo,
                proveedor: devolucion.proveedor ? devolucion.proveedor.id_proveedor : null,
                fecha_devolucion: devolucion.fecha_devolucion
            };

            console.log('Devolución a actualizar:', updatedDevolucion);
            await api.put(`/devoluciones/${id_devolucion}/`, updatedDevolucion);
            alert('Devolución actualizada correctamente');
            navigate('/devoluciones/');
        } catch (error) {
            console.error('Error al actualizar la devolución:', error.response ? error.response.data : error.message);
            alert('Error al actualizar la devolución');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h3>Editar Devolución</h3>
            <select
                value={devolucion.producto ? devolucion.producto.id_producto : ''}
                onChange={e => setDevolucion({ ...devolucion, producto: productos.find(p => p.id_producto === e.target.value) })}
                required
            >
                <option value="">Selecciona un producto</option>
                {productos.map(producto => (
                    <option key={producto.id_producto} value={producto.id_producto}>{producto.nombre_producto}</option>
                ))}
            </select>
            <input
                type="number"
                placeholder="Cantidad"
                value={devolucion.cantidad}
                onChange={e => setDevolucion({ ...devolucion, cantidad: parseInt(e.target.value) })}
                required
            />
            <textarea
                placeholder="Motivo de la devolución"
                value={devolucion.motivo}
                onChange={e => setDevolucion({ ...devolucion, motivo: e.target.value })}
                required
            />
            <select
                value={devolucion.proveedor ? devolucion.proveedor.id_proveedor : ''}
                onChange={e => setDevolucion({ ...devolucion, proveedor: proveedores.find(p => p.id_proveedor === e.target.value) })}
                required
            >
                <option value="">Selecciona un proveedor</option>
                {proveedores.map(proveedor => (
                    <option key={proveedor.id_proveedor} value={proveedor.id_proveedor}>
                        {proveedor.nombre_proveedor} {proveedor.apellidos_proveedor}
                    </option>
                ))}
            </select>
            <input
                type="date"
                value={devolucion.fecha_devolucion}
                onChange={e => setDevolucion({ ...devolucion, fecha_devolucion: e.target.value })}
                required
            />
            <button type="submit">Actualizar Devolución</button>
            <button type="button" onClick={() => navigate('/devoluciones/')} style={{ marginLeft: '10px' }}>Cancelar</button>
        </form>
    );
};

export default UpdateDevolucion;
