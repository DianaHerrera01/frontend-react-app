import React, { useState, useEffect } from 'react'; 
import api from '../../api'; // Asegúrate de que api esté correctamente configurado
import { useNavigate } from 'react-router-dom';
import '../formStyle.css';

const DeleteNota = () => {
    const [notas, setNotas] = useState([]);
    const [idNota, setIdNota] = useState('');
    const [loading, setLoading] = useState(true); // Estado de carga
    const navigate = useNavigate();

    useEffect(() => {
        const fetchNotas = async () => {
            try {
                const response = await api.get('/notas/');  // Asumiendo que esta es la ruta para obtener notas
                setNotas(response.data);
            } catch (error) {
                console.error('Error al obtener notas', error);
                alert('Error al cargar las notas');
            } finally {
                setLoading(false); // Cambia el estado de carga
            }
        };

        fetchNotas();
    }, []);

    const handleDelete = async (e) => {
        e.preventDefault();

        try {
            await api.delete(`/notas/${idNota}/`);  // Asumiendo que esta es la ruta para eliminar una nota
            alert('Nota eliminada correctamente');
            setIdNota('');
            navigate('/notas/');  // Redirigir a la lista de notas
        } catch (error) {
            console.error('Hubo un error al eliminar la nota', error);
            alert('Error al eliminar la nota. Por favor, inténtalo de nuevo.');
        }
    };

    const handleCancel = () => {
        navigate('/notas/');  // Redirige a la lista de notas si se cancela
    };

    if (loading) {
        return <p>Cargando notas...</p>;  // Mensaje de carga
    }

    return (
        <form onSubmit={handleDelete}>
            <h3>Eliminar Nota</h3>
            <select value={idNota} onChange={e => setIdNota(e.target.value)} required>
                <option value="">Selecciona una nota</option>
                {notas.map(nota => (
                    <option key={nota.id_nota} value={nota.id_nota}>
                        {nota.id_nota} - Motivo: {nota.motivo} - Tipo de Nota: {nota.tipo_nota.nom_nota}
                    </option>
                ))}
            </select>
            <button type="submit">Eliminar Nota</button>
            <button type="button" onClick={handleCancel}>Cancelar</button>
        </form>
    );
};

export default DeleteNota;
