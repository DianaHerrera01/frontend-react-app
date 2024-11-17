import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api'; // Asegúrate de que la ruta sea correcta
import '../formStyle.css'; // Asegúrate de que esta hoja de estilos exista

const CreateProductoServicio = () => {
    const navigate = useNavigate(); // Inicializa useNavigate
    const [nom_producto_serv, setNomProductoServ] = useState(''); // Estado para el nombre del producto o servicio

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const nuevoProductoServicio = {
                nom_producto_serv,
            };

            await api.post('/productos-servicios/', nuevoProductoServicio); // Llamada a la API para crear el producto/servicio
            alert("Producto/Servicio creado exitosamente");
            navigate('/productos-servicios'); // Redirige a la lista de productos y servicios
        } catch (error) {
            console.error("Error al crear el producto/servicio:", error);
            alert("Error al crear el producto/servicio");
        }
    };

    const handleCancel = () => {
        navigate('/productos-servicios'); // Redirige a la lista de productos y servicios al cancelar
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Crear Producto/Servicio</h2>
            <input 
                type="text" 
                placeholder="Nombre del Producto/Servicio" 
                value={nom_producto_serv}
                onChange={(e) => setNomProductoServ(e.target.value)} 
                required 
            />
            <button type="submit" className="btn btn-create">Crear Producto/Servicio</button>
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

export default CreateProductoServicio;
