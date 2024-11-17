import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api'; // Importa la instancia de Axios
import '../listStyle.css'; // Opcional, para estilos

const ListUsuarios = () => {
    const [usuarios, setUsuarios] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsuarios = async () => {
            try {
                const response = await api.get('/registro/'); // Endpoint para obtener usuarios
                setUsuarios(response.data);
            } catch (error) {
                console.error("Hubo un error al obtener los usuarios:", error);
            }
        };

        fetchUsuarios();
    }, []);

    const handleDelete = (id) => {
        navigate(`/eliminar-usuario/${id}`);
    };

    const handleEdit = (pk) => {
        navigate(`/editar-usuario/${pk}`);
    };

    const handleCreate = () => {
        navigate('/nuevo-usuario');
    };

    return (
        <div>
            <h2>Gestión de Usuarios</h2>
            <button onClick={handleCreate} className="btn btn-success">Crear Usuario</button>
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Username</th>
                        <th>Correo</th>
                        <th>Nombre</th>
                        <th>Apellidos</th>
                        <th className="actions">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {usuarios.map(usuario => (
                        <tr key={usuario.id}>
                            <td>{usuario.id}</td>
                            <td>{usuario.username}</td>
                            <td>{usuario.email}</td>
                            <td>{usuario.first_name}</td>
                            <td>{usuario.last_name}</td>
                            <td className="actions">
                                <button onClick={() => handleEdit(usuario.id)} className="btn btn-primary">Editar</button>
                                <button onClick={() => handleDelete(usuario.id)} className="btn btn-danger">Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ListUsuarios;
