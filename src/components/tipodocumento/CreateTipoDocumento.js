import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api'; // Asegúrate de que la ruta sea correcta
import '../formStyle.css'; // Asegúrate de que esta hoja de estilos exista

const CreateTipoDocumento = () => {
    const navigate = useNavigate(); // Inicializa useNavigate
    const [nom_tipo_doc, setNomTipoDoc] = useState(''); // Estado para el nombre del tipo de documento

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const nuevoTipoDocumento = {
                nom_tipo_doc, // Enviamos el nombre del tipo de documento al backend
            };

            await api.post('/tipos-documento/', nuevoTipoDocumento); // Asegúrate de que la ruta sea correcta
            alert("Tipo de Documento creado exitosamente");
            navigate('/tipos-documento'); // Redirige a la lista de tipos de documentos
        } catch (error) {
            console.error("Error al crear el tipo de documento:", error);
            alert("Error al crear el tipo de documento");
        }
    };

    const handleCancel = () => {
        navigate('/tipos-documento'); // Redirige a la lista de tipos de documentos al cancelar
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Crear Tipo de Documento</h2>
            <input 
                type="text" 
                placeholder="Nombre del Tipo de Documento" 
                value={nom_tipo_doc}
                onChange={(e) => setNomTipoDoc(e.target.value)} 
                required 
            />
            <button type="submit" className="btn btn-create">Crear Tipo de Documento</button>
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

export default CreateTipoDocumento;
