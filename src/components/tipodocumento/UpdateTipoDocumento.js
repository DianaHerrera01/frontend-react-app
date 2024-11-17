import React, { useEffect, useState } from 'react'; 
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../api'; // Asegúrate de configurar correctamente tu cliente de API
import '../formStyle.css';

const UpdateTipoDocumento = () => {
    // Asegúrate de que el nombre del parámetro en useParams coincida con el de la ruta
    const { id_tipo_docum } = useParams(); // Parámetro para obtener el tipo de documento a actualizar
    const navigate = useNavigate(); // Navegación programática

    const [tipoDocumento, setTipoDocumento] = useState({
        nom_tipo_doc: '',
    });

    // Efecto para cargar los datos del tipo de documento cuando el componente se monta
    useEffect(() => {
        const fetchTipoDocumento = async () => {
            try {
                const response = await api.get(`/tipos-documento/${id_tipo_docum}/`); // Solicita los datos
                // Verifica que la respuesta sea válida y contenga los datos esperados
                if (response && response.data) {
                    setTipoDocumento({
                        nom_tipo_doc: response.data.nom_tipo_doc || '', // Asegúrate de que el nombre esté presente
                    });
                }
            } catch (error) {
                console.error("Error al cargar el tipo de documento:", error);
                alert('No se pudo cargar el tipo de documento');
            }
        };

        fetchTipoDocumento();
    }, [id_tipo_docum]); // Este efecto solo se ejecuta cuando cambia el id_tipo_docum

    const handleSubmit = async (e) => {
        e.preventDefault(); // Evita el comportamiento por defecto del formulario

        try {
            const updatedTipoDocumento = {
                nom_tipo_doc: tipoDocumento.nom_tipo_doc, // Solo el campo que deseas actualizar
            };

            // Realizamos la actualización utilizando el ID
            await api.put(`/tipos-documento/${id_tipo_docum}/`, updatedTipoDocumento);
            alert('Tipo de Documento actualizado correctamente');
            navigate('/tipos-documento/'); // Redirigir a la lista de tipos de documentos
        } catch (error) {
            console.error('Error al actualizar el tipo de documento:', error.response ? error.response.data : error.message);
            alert('Error al actualizar el tipo de documento');
        }
    };

    const handleCancel = () => {
        navigate('/tipos-documento/'); // Redirigir a la lista de tipos de documentos
    };

    return (
        <div className="container">
            <h2>Actualizar Tipo de Documento</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="nom_tipo_doc">Nombre del Tipo de Documento:</label>
                    <input
                        type="text"
                        id="nom_tipo_doc"
                        className="form-control"
                        value={tipoDocumento.nom_tipo_doc}
                        onChange={(e) => setTipoDocumento({ ...tipoDocumento, nom_tipo_doc: e.target.value })}
                        required
                    />
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-primary">Actualizar</button>
                    <button type="button" className="btn btn-secondary" onClick={handleCancel}>Cancelar</button>
                </div>
            </form>
        </div>
    );
};

export default UpdateTipoDocumento;
