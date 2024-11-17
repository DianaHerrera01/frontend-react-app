import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api'; // Asegúrate de que la ruta sea correcta
import '../formStyle.css'; // Asegúrate de que esta hoja de estilos exista

const CreateCategoria = () => {
    const navigate = useNavigate(); // Inicializa useNavigate
    const [nom_categoria, setNomCategoria] = useState(''); // Estado para el nombre de la categoría

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const nuevaCategoria = {
                nom_categoria,
            };

            await api.post('/categorias/', nuevaCategoria);
            alert("Categoría creada exitosamente");
            navigate('/categorias/'); // Redirige a la lista de categorías
        } catch (error) {
            console.error("Error al crear la categoría:", error);
            alert("Error al crear la categoría");
        }
    };

    const handleCancel = () => {
        navigate('/categorias/'); // Redirige a la lista de categorías al cancelar
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Crear Categoría</h2>
            <input 
                type="text" 
                placeholder="Nombre de la Categoría" 
                value={nom_categoria}
                onChange={(e) => setNomCategoria(e.target.value)} 
                required 
            />
            <button type="submit" className="btn btn-create">Crear Categoría</button>
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

export default CreateCategoria;
