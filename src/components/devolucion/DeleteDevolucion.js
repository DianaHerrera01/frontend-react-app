import React, { useState, useEffect } from 'react';
import api from '../../api';  
import { useNavigate } from 'react-router-dom'; // Importar useNavigate
import '../formStyle.css';

const DeleteDevolucion = () => {
    const [devoluciones, setDevoluciones] = useState([]);
    const [idDevolucion, setIdDevolucion] = useState('');
    const navigate = useNavigate(); // Inicializar useNavigate

    useEffect(() => {
        // Obtener la lista de devoluciones al montar el componente
        const fetchDevoluciones = async () => {
            try {
                const response = await api.get('/devoluciones/');
                setDevoluciones(response.data);
            } catch (error) {
                console.error('Error al obtener devoluciones', error);
                alert('Error al cargar devoluciones'); // Mensaje de error si falla la carga
            }
        };

        fetchDevoluciones();
    }, []);

    const handleDelete = async (e) => {
        e.preventDefault();

        try {
            await api.delete(`/devoluciones/${idDevolucion}/`);
            alert('Devolución eliminada correctamente'); // Mensaje de éxito
            setIdDevolucion(''); // Limpia el campo después de eliminar
            
            // Redirigir a la lista de devoluciones después de eliminar
            navigate('/devoluciones/'); // Redirigir a la ruta de ListDevolucion
        } catch (error) {
            console.error('Hubo un error al eliminar la devolución', error);
            alert('Error al eliminar la devolución'); // Mensaje de error
        }
    };

    const handleCancel = () => {
        navigate('/devoluciones/'); // Redirigir a la ruta de ListDevolucion al cancelar
    };

    return (
        <form onSubmit={handleDelete}>
            <h3>Eliminar Devolución</h3>
            <select value={idDevolucion} onChange={e => setIdDevolucion(e.target.value)} required>
                <option value="">Selecciona una devolución</option>
                {devoluciones.map(devolucion => (
                    <option key={devolucion.id_devolucion} value={devolucion.id_devolucion}>
                        {devolucion.id_devolucion} - {devolucion.producto.nombre_producto} ({devolucion.cantidad} unidades)
                    </option>
                ))}
            </select>
            <button type="submit">Eliminar Devolución</button>
            <button type="button" onClick={handleCancel}>Cancelar</button> {/* Botón de Cancelar */}
        </form>
    );
};

export default DeleteDevolucion;
