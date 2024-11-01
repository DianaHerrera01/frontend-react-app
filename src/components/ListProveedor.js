import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import api from '../api'; 
import './listStyle.css'; 

const ListProveedores = () => {
    const [proveedores, setProveedores] = useState([]);
    const navigate = useNavigate(); // Inicializa useNavigate

    useEffect(() => {
        const fetchProveedores = async () => {
            try {
                const response = await api.get('/proveedores/'); 
                setProveedores(response.data);
            } catch (error) {
                console.error("Hubo un error al obtener los proveedores:", error);
            }
        };

        fetchProveedores();
    }, []);

    const handleDelete = (id_proveedor) => {
        navigate(`/eliminar-proveedor/${id_proveedor}`); // Redirigir a DeleteProveedor
    };

    const handleEdit = (id_proveedor) => {
        navigate(`/editar-proveedor/${id_proveedor}`); 
    };

    const handleCreate = () => {
        navigate('/nuevo-proveedor'); // Redirige al formulario de creación de proveedor
    };
    
    return (
        <div>
            <h2>Gestión de Proveedores</h2>
            <button onClick={handleCreate} className="btn btn-success">Crear Proveedor</button>
            <table className="table">
                <thead>
                    <tr>
                        <th>ID Proveedor</th>
                        <th>Nombre</th>
                        <th>Apellidos</th>
                        <th>Correo</th>
                        <th>Dirección</th>
                        <th>Teléfono</th>
                        <th className="actions">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {proveedores.map(proveedor => (
                        <tr key={proveedor.id_proveedor}>
                            <td>{proveedor.id_proveedor}</td>
                            <td>{proveedor.nombre_proveedor}</td>
                            <td>{proveedor.apellidos_proveedor}</td>
                            <td>{proveedor.correo}</td>
                            <td>{proveedor.direccion}</td>
                            <td>{proveedor.telefono}</td>
                            <td className="actions">
                                <button onClick={() => handleEdit(proveedor.id_proveedor)} className="btn btn-primary">Editar</button>
                                <button onClick={() => handleDelete(proveedor.id_proveedor)} className="btn btn-danger btnEliminacion">Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ListProveedores;
