import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import api from '../../api'; 
import '../listStyle.css'; 

const ListProductos = () => {
    const [productos, setProductos] = useState([]);
    const navigate = useNavigate(); // Inicializa useNavigate

    useEffect(() => {
        const fetchProductos = async () => {
            try {
                const response = await api.get('/productos/'); 
                setProductos(response.data);
            } catch (error) {
                console.error("Hubo un error al obtener los productos:", error);
            }
        };

        fetchProductos();
    }, []);

    const handleDelete = (id_producto) => {
        navigate(`/eliminar/${id_producto}`); // Redirigir a DeleteProducto en lugar de manejar la eliminación aquí
    };

    const handleEdit = (id_producto) => {
        navigate(`/editar/${id_producto}`); 
    };

    const handleCreate = () => {
        navigate('/nuevo'); // Redirige al formulario de creación de producto
    };
    
    return (
        <div>
            <h2>Gestión de Productos </h2>
            <button onClick={handleCreate} className="btn btn-success">Crear Producto</button>
            <table className="table">
                <thead>
                    <tr>
                        <th>ID Producto</th>
                        <th>Producto</th>
                        <th>Categoría</th>
                        <th>Cantidad</th>
                        <th>Descripción</th>
                        <th>Proveedor</th>
                        <th>Precio Compra</th>
                        <th>Precio Venta</th>
                        <th className="actions">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {productos.map(producto => (
                        <tr key={producto.id_producto}>
                            <td>{producto.id_producto}</td>
                            <td>{producto.nombre_producto}</td>
                            <td>{producto.categoria ? `${producto.categoria.nom_categoria}` : 'N/A'}</td>
                            <td>{producto.cantidad}</td>
                            <td>{producto.descripcion}</td>
                            <td>{producto.proveedor ? `${producto.proveedor.nombre_proveedor} ${producto.proveedor.apellidos_proveedor}` : 'N/A'}</td>
                            <td>${producto.preciounidadcompra}</td>
                            <td>${producto.preciounidadventa}</td>
                            <td className="actions">
                                <button onClick={() => handleEdit(producto.id_producto)} className="btn btn-primary">Editar</button>
                                <button onClick={() => handleDelete(producto.id_producto)} className="btn btn-danger btnEliminacion">Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ListProductos;
