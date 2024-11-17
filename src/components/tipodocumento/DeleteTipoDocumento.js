import React, { useState, useEffect } from 'react';
import api from '../../api';  
import { useNavigate } from 'react-router-dom'; // Importar useNavigate
import '../formStyle.css';

const DeleteTipoDocumento = () => {
    const [tiposDocumento, setTiposDocumento] = useState([]);
    const [tipoDocumentoID, setTipoDocumentoID] = useState('');
    const navigate = useNavigate(); // Inicializar useNavigate

    useEffect(() => {
        // Obtener la lista de tipos de documento al montar el componente
        const fetchTiposDocumento = async () => {
            try {
                const response = await api.get('/tipos-documento/'); // Asegúrate de que la URL sea correcta
                setTiposDocumento(response.data);
            } catch (error) {
                console.error('Error al obtener tipos de documento', error);
                alert('Error al cargar tipos de documento'); // Mensaje de error si falla la carga
            }
        };

        fetchTiposDocumento();
    }, []);

    const handleDelete = async (e) => {
        e.preventDefault();

        try {
            await api.delete(`/tipos-documento/${tipoDocumentoID}/`); // Eliminar tipo de documento
            alert('Tipo de Documento eliminado correctamente'); // Mensaje de éxito
            setTipoDocumentoID(''); // Limpia el campo después de eliminar
            
            // Redirigir a la lista de tipos de documento después de eliminar
            navigate('/tipos-documento'); // Redirigir a la ruta de ListTipoDocumento
        } catch (error) {
            console.error('Hubo un error al eliminar el tipo de documento', error);
            alert('Error al eliminar el tipo de documento'); // Mensaje de error
        }
    };

    const handleCancel = () => {
        navigate('/tipos-documento'); // Redirigir a la ruta de ListTipoDocumento al cancelar
    };

    return (
        <form onSubmit={handleDelete}>
            <h3>Eliminar Tipo de Documento</h3>
            <select value={tipoDocumentoID} onChange={e => setTipoDocumentoID(e.target.value)} required>
                <option value="">Selecciona un tipo de documento</option>
                {tiposDocumento.map(tipo => (
                    <option key={tipo.id_tipo_docum} value={tipo.id_tipo_docum}>
                        {tipo.id_tipo_docum} - {tipo.nom_tipo_doc}
                    </option>
                ))}
            </select>
            <button type="submit">Eliminar Tipo de Documento</button>
            <button type="button" onClick={handleCancel}>Cancelar</button>
        </form>
    );
};

export default DeleteTipoDocumento;
