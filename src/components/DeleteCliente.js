import React, { useState, useEffect } from 'react'; 
import api from '../api';  
import { useNavigate } from 'react-router-dom'; // Importar useNavigate
import './formStyle.css';

const DeleteCliente = () => {
    const [clientes, setClientes] = useState([]);
    const [idCliente, setIdCliente] = useState('');
    const navigate = useNavigate(); // Inicializar useNavigate

    useEffect(() => {
        // Obtener la lista de clientes al montar el componente
        const fetchClientes = async () => {
            try {
                const response = await api.get('/clientes/');
                setClientes(response.data);
            } catch (error) {
                console.error('Error al obtener clientes', error);
                alert('Error al cargar clientes'); // Mensaje de error si falla la carga
            }
        };

        fetchClientes();
    }, []);

    const handleDelete = async (e) => {
        e.preventDefault();

        try {
            await api.delete(`/clientes/${idCliente}/`);
            alert('Cliente eliminado correctamente'); // Mensaje de éxito
            setIdCliente(''); // Limpia el campo después de eliminar
            
            // Redirigir a la lista de clientes después de eliminar
            navigate('/clientes/'); // Redirigir a la ruta de ListCliente
        } catch (error) {
            console.error('Hubo un error al eliminar el cliente', error);
            alert('Error al eliminar el cliente'); // Mensaje de error
        }
    };

    const handleCancel = () => {
        navigate('/clientes/'); // Redirigir a la ruta de ListCliente al cancelar
    };

    return (
        <form onSubmit={handleDelete}>
            <h3>Eliminar Cliente</h3>
            <select value={idCliente} onChange={e => setIdCliente(e.target.value)} required>
                <option value="">Selecciona un cliente</option>
                {clientes.map(cliente => (
                    <option key={cliente.id_cliente} value={cliente.id_cliente}>
                        {cliente.id_cliente} - {cliente.nombre_cliente}
                    </option>
                ))}
            </select>
            <button type="submit">Eliminar Cliente</button>
            <button type="button" onClick={handleCancel}>Cancelar</button> {/* Botón de Cancelar */}
        </form>
    );
};

export default DeleteCliente;
