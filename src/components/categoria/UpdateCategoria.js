import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../api';
import '../formStyle.css';

const UpdateCategoria = () => {
    const { categoriaID } = useParams(); // Parámetro para obtener la categoría a actualizar
    const navigate = useNavigate(); // Navegación programática

    const [categoria, setCategoria] = useState({
        nom_categoria: '',
    });

    useEffect(() => {
        const fetchCategoria = async () => {
            try {
                const response = await api.get(`/categorias/${categoriaID}/`);
                setCategoria(response.data);
            } catch (error) {
                console.error("Error al cargar la categoría:", error);
                alert('No se pudo cargar la categoría');
            }
        };

        fetchCategoria();
    }, [categoriaID]); // Ejecuta el efecto solo cuando cambia categoriaID

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const updatedCategoria = {
                nom_categoria: categoria.nom_categoria,
            };

            await api.put(`/categorias/${categoriaID}/`, updatedCategoria);
            alert('Categoría actualizada correctamente');
            navigate('/categorias/');
        } catch (error) {
            console.error('Error al actualizar la categoría:', error.response ? error.response.data : error.message);
            alert('Error al actualizar la categoría');
        }
    };

    const handleCancel = () => {
        navigate('/categorias/'); // Redirigir a la lista de categorías
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Editar Categoría</h2>
            <input
                type="text"
                placeholder="Nombre de la Categoría"
                value={categoria.nom_categoria}
                onChange={e => setCategoria({ ...categoria, nom_categoria: e.target.value })}
                required
            />
            <button type="submit" className="btn btn-update">Actualizar Categoría</button>
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

export default UpdateCategoria;
