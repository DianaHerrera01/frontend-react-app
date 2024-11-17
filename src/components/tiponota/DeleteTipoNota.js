import React, { useState, useEffect } from 'react';
import api from '../../api';  
import { useNavigate } from 'react-router-dom'; // Importar useNavigate
import '../formStyle.css';

const DeleteTipoNota = () => {
    const [tiposNota, setTiposNota] = useState([]); // Estado para almacenar los tipos de nota
    const [tipoNotaID, setTipoNotaID] = useState(''); // Estado para almacenar el ID del tipo de nota seleccionado
    const navigate = useNavigate(); // Inicializar useNavigate

    useEffect(() => {
        // Obtener la lista de tipos de nota al montar el componente
        const fetchTiposNota = async () => {
            try {
                const response = await api.get('/tipo-nota/'); // Endpoint para obtener los tipos de nota
                setTiposNota(response.data);
            } catch (error) {
                console.error('Error al obtener los tipos de nota:', error);
                alert('Error al cargar los tipos de nota'); // Mensaje de error si falla la carga
            }
        };

        fetchTiposNota();
    }, []);

    const handleDelete = async (e) => {
        e.preventDefault();

        try {
            await api.delete(`/tipo-nota/${tipoNotaID}/`); // Endpoint para eliminar un tipo de nota
            alert('Tipo de Nota eliminado correctamente'); // Mensaje de éxito
            setTipoNotaID(''); // Limpia el campo después de eliminar
            
            // Redirigir a la lista de tipos de nota después de eliminar
            navigate('/tipo-nota/'); // Redirigir a la ruta de ListTipoNota
        } catch (error) {
            console.error('Error al eliminar el tipo de nota:', error);
            alert('Error al eliminar el tipo de nota'); // Mensaje de error
        }
    };

    const handleCancel = () => {
        navigate('/tipo-nota/'); // Redirigir a la ruta de ListTipoNota al cancelar
    };

    return (
        <form onSubmit={handleDelete}>
            <h3>Eliminar Tipo de Nota</h3>
            <select value={tipoNotaID} onChange={e => setTipoNotaID(e.target.value)} required>
                <option value="">Selecciona un tipo de nota</option>
                {tiposNota.map(tipoNota => (
                    <option key={tipoNota.id_tipo_nota} value={tipoNota.id_tipo_nota}>
                        {tipoNota.id_tipo_nota} - {tipoNota.nom_nota}
                    </option>
                ))}
            </select>
            <button type="submit" className="btn btn-danger">Eliminar Tipo de Nota</button>
            <button type="button" onClick={handleCancel} className="btn btn-cancel" style={{ marginLeft: '10px' }}>
                Cancelar
            </button>
        </form>
    );
};

export default DeleteTipoNota;
