import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api'; 
import '../listStyle.css'; 

const ListNotas = () => {
    const [notas, setNotas] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchNotas = async () => {
            try {
                const response = await api.get('/notas/');
                setNotas(response.data);
            } catch (error) {
                console.error("Hubo un error al obtener las notas:", error);
            }
        };
        
        fetchNotas();
    }, []);

    const handleDelete = (id_nota) => {
        navigate(`/eliminar-nota/${id_nota}`);
    };

    const handleEdit = (id_nota) => {
        navigate(`/editar-nota/${id_nota}`);
    };

    const handleCreate = () => {
        navigate('/nuevo-nota');
    };
    const handleGoToTipoNota = () => {
        navigate('/tipo-nota');
    };
    

    return (
        <div>
            <h2>Gestión de Notas</h2>
            <button onClick={handleCreate} className="btn btn-success">Crear Nota</button>
            <table className="table">
                <thead>
                    <tr>
                        <th>ID Nota</th>
                        <th>Factura</th>
                        <th>Tipo de Nota</th>
                        <th>Motivo</th>
                        <th>Productos</th>
                        <th>Total</th>
                        <th className="actions">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {notas.map(nota => (
                        <tr key={nota.id_nota}>
                            <td>{nota.id_nota}</td>
                            <td>{nota.factura ? nota.factura.id_factura : 'N/A'}</td>
                            <td>{nota.tipo_nota ? `${nota.tipo_nota.nom_nota}` : 'N/A'}</td>
                            <td>{nota.motivo}</td>
                            <td>
                                {nota.productos && nota.productos.length > 0 ? (
                                    <ul>
                                        {nota.productos.map((productoNota, index) => (
                                            <li key={index}>
                                                {productoNota.producto.nombre_producto} - Cantidad: {productoNota.cantidad} 
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <span>No hay productos</span>
                                )}
                            </td>
                            <td>{nota.valor ? parseFloat(nota.valor).toFixed(2) : '0.00'} COP</td>
                            <td className="actions">
                                <button onClick={() => handleEdit(nota.id_nota)} className="btn btn-primary">Editar</button>

                                <button onClick={() => handleDelete(nota.id_nota)} className="btn btn-danger">Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="text mt-4">
                <button onClick={handleGoToTipoNota} className="btn btn-info">
                    Gestión de Tipo de Notas
                </button>
            </div>
        </div>
    );
};

export default ListNotas;
