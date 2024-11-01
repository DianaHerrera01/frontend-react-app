import React, { useState, useEffect } from 'react'; 
import api from '../api';  
import { useNavigate } from 'react-router-dom'; // Importar useNavigate
import './formStyle.css';

const DeleteProveedor = () => {
    const [proveedores, setProveedores] = useState([]);
    const [idProveedor, setIdProveedor] = useState(''); // Cambiar el estado a idProveedor
    const navigate = useNavigate(); // Inicializar useNavigate

    useEffect(() => {
        // Obtener la lista de proveedores al montar el componente
        const fetchProveedores = async () => {
            try {
                const response = await api.get('/proveedores/'); // Asegúrate de que esta sea la ruta correcta
                setProveedores(response.data);
            } catch (error) {
                console.error('Error al obtener proveedores', error);
                alert('Error al cargar proveedores'); // Mensaje de error si falla la carga
            }
        };

        fetchProveedores();
    }, []);

    const handleDelete = async (e) => {
        e.preventDefault();

        try {
            await api.delete(`/proveedores/${idProveedor}/`); // Asegúrate de que esta sea la ruta correcta
            alert('Proveedor eliminado correctamente'); // Mensaje de éxito
            setIdProveedor(''); // Limpia el campo después de eliminar
            
            // Redirigir a la lista de proveedores después de eliminar
            navigate('/proveedores/'); // Redirigir a la ruta de ListProveedor
        } catch (error) {
            console.error('Hubo un error al eliminar el proveedor', error);
            alert('Error al eliminar el proveedor'); // Mensaje de error
        }
    };

    const handleCancel = () => {
        navigate('/proveedores/'); // Redirigir a la ruta de ListProveedor al cancelar
    };

    return (
        <form onSubmit={handleDelete}>
            <h3>Eliminar Proveedor</h3>
            <select value={idProveedor} onChange={e => setIdProveedor(e.target.value)} required>
                <option value="">Selecciona un proveedor</option>
                {proveedores.map(proveedor => (
                    <option key={proveedor.id_proveedor} value={proveedor.id_proveedor}>
                        {proveedor.id_proveedor} - {proveedor.nombre_proveedor}
                    </option>
                ))}
            </select>
            <button type="submit">Eliminar Proveedor</button>
            <button type="button" onClick={handleCancel}>Cancelar</button> {/* Botón de Cancelar */}
        </form>
    );
};

export default DeleteProveedor;
