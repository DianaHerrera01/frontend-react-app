import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api';
import '../listStyle.css';

const ListTipoNota = () => {
    const [tiposNota, setTiposNota] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTiposNota = async () => {
            try {
                const response = await api.get('/tipo-nota/');  // Cambia la URL según tu API
                setTiposNota(response.data);
            } catch (error) {
                console.error("Hubo un error al obtener los tipos de nota:", error);
            }
        };

        fetchTiposNota();
    }, []);

    const handleDelete = (tipoNotaID) => {
        navigate(`/eliminar-tipo-nota/${tipoNotaID}`);
    };

    const handleEdit = (tipoNotaID) => {
        navigate(`/editar-tipo-nota/${tipoNotaID}`);
    };

    const handleCreate = () => {
        navigate('/nuevo-tipo-nota');
    };

    return (
        <div>
            <h2>Gestión de Tipos de Nota</h2>
            <button onClick={handleCreate} className="btn btn-success">Crear Tipo de Nota</button>
            <table className="table">
                <thead>
                    <tr>
                        <th>ID Tipo de Nota</th>
                        <th>Nombre Tipo de Nota</th>
                        <th className="actions">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {tiposNota.map(tipoNota => (
                        <tr key={tipoNota.id_tipo_nota}>
                            <td>{tipoNota.id_tipo_nota}</td>
                            <td>{tipoNota.nom_nota}</td>
                            <td className="actions">
                                <button onClick={() => handleEdit(tipoNota.id_tipo_nota)} className="btn btn-primary">Editar</button>
                                <button onClick={() => handleDelete(tipoNota.id_tipo_nota)} className="btn btn-danger btnEliminacion">Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ListTipoNota;
