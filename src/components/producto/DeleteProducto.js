import React, { useState, useEffect } from 'react'; 
import api from '../../api';  
import { useNavigate } from 'react-router-dom'; // Importar useNavigate
import '../formStyle.css';

const DeleteProducto = () => {
    const [productos, setProductos] = useState([]);
    const [idProducto, setIdProducto] = useState('');
    const navigate = useNavigate(); // Inicializar useNavigate

    useEffect(() => {
        // Obtener la lista de productos al montar el componente
        const fetchProductos = async () => {
            try {
                const response = await api.get('/productos/');
                setProductos(response.data);
            } catch (error) {
                console.error('Error al obtener productos', error);
                alert('Error al cargar productos'); // Mensaje de error si falla la carga
            }
        };

        fetchProductos();
    }, []);

    const handleDelete = async (e) => {
        e.preventDefault();

        try {
            await api.delete(`/productos/${idProducto}/`);
            alert('Producto eliminado correctamente'); // Mensaje de éxito
            setIdProducto(''); // Limpia el campo después de eliminar
            
            // Redirigir a la lista de productos después de eliminar
            navigate('/productos/'); // Redirigir a la ruta de ListProducto
        } catch (error) {
            console.error('Hubo un error al eliminar el producto', error);
            alert('Error al eliminar el producto'); // Mensaje de error
        }
    };

    const handleCancel = () => {
        navigate('/productos/'); // Redirigir a la ruta de ListProducto al cancelar
    };

    return (
        <form onSubmit={handleDelete}>
            <h3>Eliminar Producto</h3>
            <select value={idProducto} onChange={e => setIdProducto(e.target.value)} required>
                <option value="">Selecciona un producto</option>
                {productos.map(producto => (
                    <option key={producto.id_producto} value={producto.id_producto}>
                        {producto.id_producto} - {producto.nombre_producto}
                    </option>
                ))}
            </select>
            <button type="submit">Eliminar Producto</button>
            <button type="button" onClick={handleCancel}>Cancelar</button>
        </form>
    );
};

export default DeleteProducto;
