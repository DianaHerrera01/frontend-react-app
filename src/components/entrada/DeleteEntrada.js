import React, { useState, useEffect } from 'react';
import api from '../../api';
import { useNavigate } from 'react-router-dom';
import '../formStyle.css';

const DeleteEntrada = () => {
    const [entradas, setEntradas] = useState([]);
    const [idEntrada, setIdEntrada] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // Obtener la lista de entradas al montar el componente
        const fetchEntradas = async () => {
            try {
                const response = await api.get('/entradas/');
                setEntradas(response.data);
            } catch (error) {
                console.error('Error al obtener entradas', error);
                alert('Error al cargar entradas');
            }
        };

        fetchEntradas();
    }, []);

    const handleDelete = async (e) => {
        e.preventDefault();

        try {
            await api.delete(`/entradas/${idEntrada}/`);
            alert('Entrada eliminada correctamente');
            setIdEntrada('');

            // Redirigir a la lista de entradas después de eliminar
            navigate('/entradas/');
        } catch (error) {
            console.error('Hubo un error al eliminar la entrada', error);
            alert('Error al eliminar la entrada');
        }
    };

    const handleCancel = () => {
        navigate('/entradas/');
    };

    return (
        <form onSubmit={handleDelete}>
            <h3>Eliminar Entrada</h3>
            <select value={idEntrada} onChange={e => setIdEntrada(e.target.value)} required>
                <option value="">Selecciona una entrada</option>
                {entradas.map(entrada => (
                    <option key={entrada.id_entrada} value={entrada.id_entrada}>
                        {entrada.id_entrada} - {entrada.producto.nombre_producto} - {entrada.cantidad}
                    </option>
                ))}
            </select>
            <button type="submit">Eliminar Entrada</button>
            <button type="button" onClick={handleCancel}>Cancelar</button>
        </form>
    );
};

export default DeleteEntrada;
