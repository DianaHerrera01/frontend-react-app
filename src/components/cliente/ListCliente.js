import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api'; 
import '../listStyle.css'; 

const ListClientes = () => {
    const [clientes, setClientes] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchClientes = async () => {
            try {
                const response = await api.get('/clientes/'); 
                setClientes(response.data);
            } catch (error) {
                console.error("Hubo un error al obtener los clientes:", error);
            }
        };

        fetchClientes();
    }, []);

    const handleDelete = (id_cliente) => {
        navigate(`/eliminar-cliente/${id_cliente}`); // Redirigir a DeleteCliente
    };

    const handleEdit = (id_cliente) => {
        navigate(`/editar-cliente/${id_cliente}`); 
    };

    const handleCreate = () => {
        navigate('/nuevo-cliente'); // Redirige al formulario de creación de cliente
    };
    
    return (
        <div>
            <h2>Gestión de Clientes</h2>
            <button onClick={handleCreate} className="btn btn-success">Crear Cliente</button>
            <table className="table">
                <thead>
                    <tr>
                        <th>ID Cliente</th>
                        <th>Nombre</th>
                        <th>Apellidos</th>
                        <th>Correo</th>
                        <th>Tipo de Documento</th>
                        <th>Número de Documento</th>
                        <th>Teléfono</th>
                        <th className="actions">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {clientes.map(cliente => (
                        <tr key={cliente.id_cliente}>
                            <td>{cliente.id_cliente}</td>
                            <td>{cliente.nombre_cliente}</td>
                            <td>{cliente.apellidos_cliente}</td>
                            <td>{cliente.correo}</td>
                            <td>{cliente.tipo_documento ? `${cliente.tipo_documento.nombre}` : 'N/A'}</td>
                            <td>{cliente.documento_cli}</td>
                            <td>{cliente.telefono}</td>
                            <td className="actions">
                                <button onClick={() => handleEdit(cliente.id_cliente)} className="btn btn-primary">Editar</button>
                                <button onClick={() => handleDelete(cliente.id_cliente)} className="btn btn-danger btnEliminacion">Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ListClientes;
