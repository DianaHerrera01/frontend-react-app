import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api'; 
import '../formStyle.css'; 

const CreateTipoNota = () => {
    const navigate = useNavigate(); // Inicializa useNavigate
    const [nom_nota, setNomNota] = useState(''); // Estado para el nombre del tipo de nota

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const nuevoTipoNota = {
                nom_nota,
            };

            await api.post('/tipo-nota/', nuevoTipoNota);
            alert("Tipo de Nota creado exitosamente");
            navigate('/tipo-nota/'); // Redirige a la lista de tipos de nota
        } catch (error) {
            console.error("Error al crear el tipo de nota:", error);
            alert("Error al crear el tipo de nota");
        }
    };

    const handleCancel = () => {
        navigate('/tipo-nota/'); // Redirige a la lista de tipos de nota al cancelar
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Crear Tipo de Nota</h2>
            <input 
                type="text" 
                placeholder="Nombre del Tipo de Nota" 
                value={nom_nota}
                onChange={(e) => setNomNota(e.target.value)} 
                required 
            />
            <button type="submit" className="btn btn-create">Crear Tipo de Nota</button>
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

export default CreateTipoNota;
