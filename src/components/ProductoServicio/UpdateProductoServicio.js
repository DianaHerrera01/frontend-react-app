import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../api'; // Asegúrate de tener configurada la API correctamente
import '../formStyle.css'; // Si tienes estilos personalizados

const UpdateProductoServicio = () => {
    const { id_producto_servicio } = useParams(); // Parámetro para obtener el producto/servicio a actualizar
    const navigate = useNavigate(); // Navegación programática

    const [productoServicio, setProductoServicio] = useState({
        nom_producto_serv: '',
    });

    // Efecto para cargar el producto/servicio al montar el componente
    useEffect(() => {
        const fetchProductoServicio = async () => {
            try {
                const response = await api.get(`/productos-servicios/${id_producto_servicio}/`);
                console.log(response); // Verifica la respuesta de la API en la consola
                setProductoServicio(response.data); // Establece los datos obtenidos en el estado
            } catch (error) {
                console.error("Error al cargar el producto/servicio:", error);
                alert('No se pudo cargar el producto/servicio');
            }
        };

        fetchProductoServicio();
    }, [id_producto_servicio]); // Ejecuta el efecto solo cuando cambia id_producto_servicio

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const updatedProductoServicio = {
                nom_producto_serv: productoServicio.nom_producto_serv,
            };

            await api.put(`/productos-servicios/${id_producto_servicio}/`, updatedProductoServicio);
            alert('Producto/Servicio actualizado correctamente');
            navigate('/productos-servicios/'); // Redirige a la lista de productos/servicios
        } catch (error) {
            console.error('Error al actualizar el producto/servicio:', error.response ? error.response.data : error.message);
            alert('Error al actualizar el producto/servicio');
        }
    };

    const handleCancel = () => {
        navigate('/productos-servicios/'); // Redirigir a la lista de productos/servicios
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Editar Producto/Servicio</h2>
            <input
                type="text"
                placeholder="Nombre del Producto/Servicio"
                value={productoServicio.nom_producto_serv}
                onChange={e => setProductoServicio({ ...productoServicio, nom_producto_serv: e.target.value })}
                required
            />
            <button type="submit" className="btn btn-update">Actualizar Producto/Servicio</button>
            <button 
                type="button" 
                onClick={handleCancel} 
                style={{ marginLeft: '10px' }} 
                className="btn btn-cancel"
            >
                Cancelar
            </button>
        </form>
    );
};

export default UpdateProductoServicio;
