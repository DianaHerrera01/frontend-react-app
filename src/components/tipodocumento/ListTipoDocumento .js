import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api';  // Assuming you're using axios or another API utility
import '../listStyle.css';

const ListTipoDocumento = () => {
    const [tiposDocumento, setTiposDocumento] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTiposDocumento = async () => {
            try {
                const response = await api.get('/tipos-documento/');
                setTiposDocumento(response.data);
            } catch (error) {
                console.error("Hubo un error al obtener los tipos de documento:", error);
            }
        };

        fetchTiposDocumento();
    }, []);

    const handleDelete = (tipoDocumentoID) => {
        navigate(`/eliminar-tipo-documento/${tipoDocumentoID}`);
    };

    const handleEdit = (tipoDocumentoID) => {
        navigate(`/tipos-documento/${tipoDocumentoID}`);
    };

    const handleCreate = () => {
        navigate('/nuevo-tipo-documento');
    };

    return (
        <div>
            <h2>Gestión de Tipos de Documento</h2>
            <button onClick={handleCreate} className="btn btn-success">Crear Tipo de Documento</button>
            <table className="table">
                <thead>
                    <tr>
                        <th>ID Tipo de Documento</th>
                        <th>Nombre Tipo de Documento</th>
                        <th className="actions">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {tiposDocumento.map(tipo => (
                        <tr key={tipo.id_tipo_docum}>
                            <td>{tipo.id_tipo_docum}</td>
                            <td>{tipo.nom_tipo_doc}</td>
                            <td className="actions">
                                <button onClick={() => handleEdit(tipo.id_tipo_docum)} className="btn btn-primary">Editar</button>
                                <button onClick={() => handleDelete(tipo.id_tipo_docum)} className="btn btn-danger btnEliminacion">Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ListTipoDocumento;
