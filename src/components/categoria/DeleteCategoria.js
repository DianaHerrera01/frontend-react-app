import React, { useState, useEffect } from 'react';
import api from '../../api';  
import { useNavigate } from 'react-router-dom'; // Importar useNavigate
import '../formStyle.css';

const DeleteCategoria = () => {
    const [categorias, setCategorias] = useState([]);
    const [categoriaID, setCategoriaID] = useState('');
    const navigate = useNavigate(); // Inicializar useNavigate

    useEffect(() => {
        // Obtener la lista de categorías al montar el componente
        const fetchCategorias = async () => {
            try {
                const response = await api.get('/categorias/');
                setCategorias(response.data);
            } catch (error) {
                console.error('Error al obtener categorías', error);
                alert('Error al cargar categorías'); // Mensaje de error si falla la carga
            }
        };

        fetchCategorias();
    }, []);

    const handleDelete = async (e) => {
        e.preventDefault();

        try {
            await api.delete(`/categorias/${categoriaID}/`);
            alert('Categoría eliminada correctamente'); // Mensaje de éxito
            setCategoriaID(''); // Limpia el campo después de eliminar
            
            // Redirigir a la lista de categorías después de eliminar
            navigate('/categorias/'); // Redirigir a la ruta de ListCategoria
        } catch (error) {
            console.error('Hubo un error al eliminar la categoría', error);
            alert('Error al eliminar la categoría'); // Mensaje de error
        }
    };

    const handleCancel = () => {
        navigate('/categorias/'); // Redirigir a la ruta de ListCategoria al cancelar
    };

    return (
        <form onSubmit={handleDelete}>
            <h3>Eliminar Categoría</h3>
            <select value={categoriaID} onChange={e => setCategoriaID(e.target.value)} required>
                <option value="">Selecciona una categoría</option>
                {categorias.map(categoria => (
                    <option key={categoria.categoriaID} value={categoria.categoriaID}>
                        {categoria.categoriaID} - {categoria.nom_categoria}
                    </option>
                ))}
            </select>
            <button type="submit">Eliminar Categoría</button>
            <button type="button" onClick={handleCancel}>Cancelar</button>
        </form>
    );
};

export default DeleteCategoria;
