import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api'; 
import '../formStyle.css';

const CreateDevolucion = () => {
    const navigate = useNavigate();
    const [producto, setProducto] = useState('');
    const [cantidad, setCantidad] = useState('');
    const [motivo, setMotivo] = useState('');
    const [proveedor, setProveedor] = useState('');
    const [fechaDevolucion, setFechaDevolucion] = useState('');
    const [productos, setProductos] = useState([]);
    const [proveedores, setProveedores] = useState([]);

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
            const nuevaDevolucion = {
                producto,
                cantidad,
                motivo,
                proveedor,
                fecha_devolucion: fechaDevolucion // Agrega la fecha de devolución al objeto
            };

            await api.post('/devoluciones/', nuevaDevolucion);
            alert("Devolución creada exitosamente");
            navigate('/devoluciones/');
        } catch (error) {
            console.error("Error al crear la devolución:", error);
            alert("Error al crear la devolución");
        }
    };

    const handleCancel = () => {
        navigate('/devoluciones/');
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Crear Devolución</h2>
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
            <textarea 
                placeholder="Motivo de la devolución" 
                onChange={(e) => setMotivo(e.target.value)} 
                required 
            />
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
            <input 
                type="date" 
                value={fechaDevolucion}
                onChange={(e) => setFechaDevolucion(e.target.value)}
                required 
            />
            <button type="submit">Crear Devolución</button>
            <button type="button" onClick={handleCancel} style={{ marginLeft: '10px' }}>Cancelar</button>
        </form>
    );
};

export default CreateDevolucion;
