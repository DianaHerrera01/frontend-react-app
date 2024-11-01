import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api';
import './formStyle.css';

const UpdateProducto = () => {
    const { id_producto } = useParams();
    const navigate = useNavigate();
    
    const [producto, setProducto] = useState({
        nombre_producto: '',
        cantidad: 0,
        categoria: null,
        descripcion: '',
        proveedor: null,
        preciounidadcompra: 0.0,
        preciounidadventa: 0.0,
    });
    
    const [categorias, setCategorias] = useState([]);
    const [proveedores, setProveedores] = useState([]);

    useEffect(() => {
        const fetchProducto = async () => {
            try {
                const response = await api.get(`/productos/${id_producto}/`);
                setProducto(response.data);
            } catch (error) {
                console.error("Error al cargar el producto:", error);
                alert('No se pudo cargar el producto');
            }
        };

        const fetchCategorias = async () => {
            try {
                const response = await api.get('/categorias/');
                setCategorias(response.data);
            } catch (error) {
                console.error("Error al cargar las categorías:", error);
            }
        };

        const fetchProveedores = async () => {
            try {
                const response = await api.get('/proveedores/');
                setProveedores(response.data);
            } catch (error) {
                console.error("Error al cargar los proveedores:", error);
            }
        };

        fetchProducto();
        fetchCategorias();
        fetchProveedores();
    }, [id_producto, navigate]); // Añadir navigate como dependencia

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const updatedProducto = {
                nombre_producto: producto.nombre_producto,
                cantidad: producto.cantidad,
                categoria: producto.categoria ? producto.categoria.categoriaID : null, 
                descripcion: producto.descripcion,
                proveedor: producto.proveedor ? producto.proveedor.id_proveedor : null,
                preciounidadcompra: producto.preciounidadcompra,
                preciounidadventa: producto.preciounidadventa,
            };

            console.log('Producto a actualizar:', updatedProducto); 
            await api.put(`/productos/${id_producto}/`, updatedProducto);
            alert('Producto actualizado correctamente');
            navigate('/productos/');
        } catch (error) {
            console.error('Error al actualizar el producto:', error.response ? error.response.data : error.message);
            alert('Error al actualizar el producto');
        }
    };

    const handleCancel = () => {
        navigate('/productos/'); // Redirigir a la ruta de ListProducto al cancelar
    };

    return (
        <form onSubmit={handleSubmit}>
            <h3>Editar Producto</h3>
            <input
                type="text"
                placeholder="Nombre del producto"
                value={producto.nombre_producto}
                onChange={e => setProducto({ ...producto, nombre_producto: e.target.value })}
                required
            />
            <input
                type="number"
                placeholder="Cantidad"
                value={producto.cantidad}
                onChange={e => setProducto({ ...producto, cantidad: parseInt(e.target.value) })}
                required
            />
            <select
                value={producto.categoria ? producto.categoria.categoriaID : ''}
                onChange={e => setProducto({ ...producto, categoria: categorias.find(c => c.categoriaID === e.target.value) })}
                required
            >
                <option value="">Selecciona una categoría</option>
                {categorias.map(categoria => (
                    <option key={categoria.categoriaID} value={categoria.categoriaID}>{categoria.nom_categoria}</option>
                ))}
            </select>
            <textarea
                placeholder="Descripción"
                value={producto.descripcion}
                onChange={e => setProducto({ ...producto, descripcion: e.target.value })}
                required
            />
            <select
                value={producto.proveedor ? producto.proveedor.id_proveedor : ''}
                onChange={e => setProducto({ ...producto, proveedor: proveedores.find(p => p.id_proveedor === e.target.value) })}
            >
                <option value="">Selecciona un proveedor</option>
                {proveedores.map(proveedor => (
                    <option key={proveedor.id_proveedor} value={proveedor.id_proveedor}>
                        {proveedor.nombre_proveedor} {proveedor.apellidos_proveedor}
                    </option>
                ))}
            </select>
            <input
                type="number"
                placeholder="Precio Unidad Compra"
                value={producto.preciounidadcompra}
                onChange={e => setProducto({ ...producto, preciounidadcompra: parseFloat(e.target.value) })}
                required
            />
            <input
                type="number"
                placeholder="Precio Unidad Venta"
                value={producto.preciounidadventa}
                onChange={e => setProducto({ ...producto, preciounidadventa: parseFloat(e.target.value) })}
                required
            />
            <button type="submit">Actualizar Producto</button>
            <button type="button" onClick={handleCancel}>Cancelar</button>
        </form>
    );
};

export default UpdateProducto;
