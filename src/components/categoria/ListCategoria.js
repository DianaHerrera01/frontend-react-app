import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api';
import '../listStyle.css';

const ListCategorias = () => {
    const [categorias, setCategorias] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCategorias = async () => {
            try {
                const response = await api.get('/categorias/');
                setCategorias(response.data);
            } catch (error) {
                console.error("Hubo un error al obtener las categorías:", error);
            }
        };

        fetchCategorias();
    }, []);

    const handleDelete = (categoriaID) => {
        navigate(`/eliminar-categoria/${categoriaID}`);
    };

    const handleEdit = (categoriaID) => {
        navigate(`/editar-categoria/${categoriaID}`);
    };

    const handleCreate = () => {
        navigate('/nueva-categoria');
    };

    return (
        <div>
            <h2>Gestión de Categorías</h2>
            <button onClick={handleCreate} className="btn btn-success">Crear Categoría</button>
            <table className="table">
                <thead>
                    <tr>
                        <th>ID Categoría</th>
                        <th>Nombre Categoría</th>
                        <th className="actions">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {categorias.map(categoria => (
                        <tr key={categoria.categoriaID}>
                            <td>{categoria.categoriaID}</td>
                            <td>{categoria.nom_categoria}</td>
                            <td className="actions">
                                <button onClick={() => handleEdit(categoria.categoriaID)} className="btn btn-primary">Editar</button>
                                <button onClick={() => handleDelete(categoria.categoriaID)} className="btn btn-danger btnEliminacion">Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ListCategorias;
