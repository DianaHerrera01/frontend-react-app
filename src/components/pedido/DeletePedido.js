import React, { useState, useEffect } from 'react'; 
import api from '../../api';  
import { useNavigate } from 'react-router-dom'; // Importar useNavigate
import '../formStyle.css';

const DeletePedido = () => {
    const [pedidos, setPedidos] = useState([]);
    const [idOrdenPedido, setIdOrdenPedido] = useState(''); // Cambiado a idOrdenPedido
    const navigate = useNavigate(); // Inicializar useNavigate

    useEffect(() => {
        // Obtener la lista de pedidos al montar el componente
        const fetchPedidos = async () => {
            try {
                const response = await api.get('/pedidos/');
                setPedidos(response.data);
            } catch (error) {
                console.error('Error al obtener pedidos', error);
                alert('Error al cargar pedidos'); // Mensaje de error si falla la carga
            }
        };

        fetchPedidos();
    }, []);

    const handleDelete = async (e) => {
        e.preventDefault();

        try {
            await api.delete(`/pedidos/${idOrdenPedido}/`); // Usar idOrdenPedido
            alert('Pedido eliminado correctamente'); // Mensaje de éxito
            setIdOrdenPedido(''); // Limpia el campo después de eliminar
            
            // Redirigir a la lista de pedidos después de eliminar
            navigate('/pedidos/'); // Redirigir a la ruta de ListPedido
        } catch (error) {
            console.error('Hubo un error al eliminar el pedido', error);
            alert('Error al eliminar el pedido'); // Mensaje de error
        }
    };

    const handleCancel = () => {
        navigate('/pedidos/'); // Redirigir a la ruta de ListPedido al cancelar
    };

    return (
        <form onSubmit={handleDelete}>
            <h3>Eliminar Pedido</h3>
            <select value={idOrdenPedido} onChange={e => setIdOrdenPedido(e.target.value)} required>
                <option value="">Selecciona un pedido</option>
                {pedidos.map(pedido => (
                    <option key={pedido.id_orden_pedido} value={pedido.id_orden_pedido}>
                        {pedido.id_orden_pedido} - {pedido.producto.nombre_producto} (Cantidad: {pedido.cantidad})
                    </option>
                ))}
            </select>
            <button type="submit">Eliminar Pedido</button>
            <button type="button" onClick={handleCancel}>Cancelar</button> {/* Botón de Cancelar */}
        </form>
    );
};

export default DeletePedido;
