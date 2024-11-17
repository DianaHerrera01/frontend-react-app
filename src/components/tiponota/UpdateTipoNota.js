import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../api'; // Asegúrate de que la ruta sea correcta
import '../formStyle.css'; // Asegúrate de que esta hoja de estilos exista

const UpdateTipoNota = () => {
    const { tipoNotaID } = useParams(); // Parámetro para obtener el tipo de nota a actualizar
    const navigate = useNavigate(); // Navegación programática

    const [tipoNota, setTipoNota] = useState({
        nom_nota: '',
    });

    useEffect(() => {
        const fetchTipoNota = async () => {
            try {
                const response = await api.get(`/tipo-nota/${tipoNotaID}/`); // URL para obtener el tipo de nota
                setTipoNota(response.data);
            } catch (error) {
                console.error("Error al cargar el tipo de nota:", error);
                alert('No se pudo cargar el tipo de nota');
            }
        };

        fetchTipoNota();
    }, [tipoNotaID]); // Ejecuta el efecto solo cuando cambia tipoNotaID

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const updatedTipoNota = {
                nom_nota: tipoNota.nom_nota,
            };

            await api.put(`/tipo-nota/${tipoNotaID}/`, updatedTipoNota); // URL para actualizar el tipo de nota
            alert('Tipo de Nota actualizado correctamente');
            navigate('/tipo-nota/'); // Redirigir a la lista de tipos de nota
        } catch (error) {
            console.error('Error al actualizar el tipo de nota:', error.response ? error.response.data : error.message);
            alert('Error al actualizar el tipo de nota');
        }
    };

    const handleCancel = () => {
        navigate('/tipo-nota/'); // Redirigir a la lista de tipos de nota
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Editar Tipo de Nota</h2>
            <input
                type="text"
                placeholder="Nombre del Tipo de Nota"
                value={tipoNota.nom_nota}
                onChange={e => setTipoNota({ ...tipoNota, nom_nota: e.target.value })}
                required
            />
            <button type="submit" className="btn btn-update">Actualizar Tipo de Nota</button>
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

export default UpdateTipoNota;
