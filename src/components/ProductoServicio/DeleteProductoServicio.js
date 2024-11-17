import React, { useState, useEffect } from 'react';
import api from '../../api';  
import { useNavigate } from 'react-router-dom'; // Importar useNavigate
import '../formStyle.css';

const DeleteProductoServicio = () => {
    const [productosServicios, setProductosServicios] = useState([]);
    const [productoServicioID, setProductoServicioID] = useState('');
    const navigate = useNavigate(); // Inicializar useNavigate

    useEffect(() => {
        // Obtener la lista de productos/servicios al montar el componente
        const fetchProductosServicios = async () => {
            try {
                const response = await api.get('/productos-servicios/');
                setProductosServicios(response.data);
            } catch (error) {
                console.error('Error al obtener productos/servicios', error);
                alert('Error al cargar productos/servicios'); // Mensaje de error si falla la carga
            }
        };

        fetchProductosServicios();
    }, []);

    const handleDelete = async (e) => {
        e.preventDefault();

        try {
            await api.delete(`/productos-servicios/${productoServicioID}/`);
            alert('Producto/Servicio eliminado correctamente'); // Mensaje de éxito
            setProductoServicioID(''); // Limpia el campo después de eliminar
            
            // Redirigir a la lista de productos/servicios después de eliminar
            navigate('/productos-servicios/'); // Redirigir a la ruta de ListProductoServicio
        } catch (error) {
            console.error('Hubo un error al eliminar el producto/servicio', error);
            alert('Error al eliminar el producto/servicio'); // Mensaje de error
        }
    };

    const handleCancel = () => {
        navigate('/productos-servicios/'); // Redirigir a la ruta de ListProductoServicio al cancelar
    };

    return (
        <form onSubmit={handleDelete}>
            <h3>Eliminar Producto/Servicio</h3>
            <select value={productoServicioID} onChange={e => setProductoServicioID(e.target.value)} required>
                <option value="">Selecciona un producto/servicio</option>
                {productosServicios.map(productoServicio => (
                    <option key={productoServicio.id_producto_servicio} value={productoServicio.id_producto_servicio}>
                        {productoServicio.id_producto_servicio} - {productoServicio.nom_producto_serv}
                    </option>
                ))}
            </select>
            <button type="submit">Eliminar Producto/Servicio</button>
            <button type="button" onClick={handleCancel}>Cancelar</button>
        </form>
    );
};

export default DeleteProductoServicio;
