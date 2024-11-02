import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import api from '../../api'; 
import '../listStyle.css'; 

const ListEntrada = () => {
    const [entradas, setEntradas] = useState([]);
    const navigate = useNavigate(); // Inicializa useNavigate

    useEffect(() => {
        const fetchEntradas = async () => {
            try {
                const response = await api.get('/entradas/'); 
                setEntradas(response.data);
            } catch (error) {
                console.error("Hubo un error al obtener las entradas:", error);
            }
        };

        fetchEntradas();
    }, []);

    const handleDelete = (id_entrada) => {
        navigate(`/eliminar-entrada/${id_entrada}`); // Redirigir a DeleteEntrada
    };

    const handleEdit = (id_entrada) => {
        navigate(`/editar-entrada/${id_entrada}`); 
    };

    const handleCreate = () => {
        navigate('/nuevo-entrada'); // Redirige al formulario de creación de entrada
    };

    return (
        <div>
            <h2>Gestión de Entradas</h2>
            <button onClick={handleCreate} className="btn btn-success">Crear Entrada</button>
            <table className="table">
                <thead>
                    <tr>
                        <th>ID Entrada</th>
                        <th>Producto</th>
                        <th>Proveedor</th>
                        <th>Cantidad</th>
                        <th>Fecha</th>
                        <th>Precio Unidad Compra</th>
                        <th>Precio Total Compra</th>
                        <th className="actions">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {entradas.map(entrada => (
                        <tr key={entrada.id_entrada}>
                            <td>{entrada.id_entrada}</td>
                            <td>{entrada.producto ? entrada.producto.nombre_producto : 'N/A'}</td>
                            <td>{entrada.proveedor ? `${entrada.proveedor.nombre_proveedor} ${entrada.proveedor.apellidos_proveedor}` : 'N/A'}</td>
                            <td>{entrada.cantidad}</td>
                            <td>{entrada.fecha}</td>
                            <td>${entrada.precio_unidad_compra}</td>
                            <td>${entrada.precio_total_compra}</td>
                            <td className="actions">
                                <button onClick={() => handleEdit(entrada.id_entrada)} className="btn btn-primary">Editar</button>
                                <button onClick={() => handleDelete(entrada.id_entrada)} className="btn btn-danger btnEliminacion">Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ListEntrada;
