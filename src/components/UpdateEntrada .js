import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api';
import './formStyle.css';

const UpdateEntrada = () => {
    const { id_entrada } = useParams();
    const navigate = useNavigate();

    const [entrada, setEntrada] = useState({
        producto: null,
        categoria: null,
        proveedor: null,
        cantidad: 0,
        fecha: '',
        precio_unidad_compra: 0.0,
    });

    const [productos, setProductos] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [proveedores, setProveedores] = useState([]);

    useEffect(() => {
        const fetchEntrada = async () => {
            try {
                const response = await api.get(`/entradas/${id_entrada}/`);
                setEntrada(response.data);
            } catch (error) {
                console.error("Error al cargar la entrada:", error);
                alert('No se pudo cargar la entrada');
            }
        };

        const fetchProductos = async () => {
            try {
                const response = await api.get('/productos/');
                setProductos(response.data);
            } catch (error) {
                console.error("Error al cargar los productos:", error);
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

        fetchEntrada();
        fetchProductos();
        fetchCategorias();
        fetchProveedores();
    }, [id_entrada]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const updatedEntrada = {
                pedido: entrada.pedido ? entrada.pedido.id : null, // Añade este campo si pedido es requerido
                producto: entrada.producto ? entrada.producto.id_producto : null,
                categoria: entrada.categoria ? entrada.categoria.categoriaID : null,
                proveedor: entrada.proveedor ? entrada.proveedor.id_proveedor : null,
                cantidad: parseInt(entrada.cantidad, 10),
                fecha: entrada.fecha,
                precio_unidad_compra: parseFloat(entrada.precio_unidad_compra),
            };
    
            console.log('Entrada a actualizar:', updatedEntrada);
            await api.put(`/entradas/${id_entrada}/`, updatedEntrada);
            alert('Entrada actualizada correctamente');
            navigate('/entradas/');
        } catch (error) {
            console.error('Error al actualizar la entrada:', error.response ? error.response.data : error.message);
            alert('Error al actualizar la entrada');
        }
    };
    
    return (
        <form onSubmit={handleSubmit}>
            <h3>Editar Entrada</h3>
            <select
                value={entrada.producto ? entrada.producto.id_producto : ''}
                onChange={e => setEntrada({ ...entrada, producto: productos.find(p => p.id_producto === parseInt(e.target.value)) })}
                required
            >
                <option value="">Selecciona un producto</option>
                {productos.map(producto => (
                    <option key={producto.id_producto} value={producto.id_producto}>{producto.nombre_producto}</option>
                ))}
            </select>
            <select
                value={entrada.categoria ? entrada.categoria.categoriaID : ''}
                onChange={e => setEntrada({ ...entrada, categoria: categorias.find(c => c.categoriaID === parseInt(e.target.value)) })}
                required
            >
                <option value="">Selecciona una categoría</option>
                {categorias.map(categoria => (
                    <option key={categoria.categoriaID} value={categoria.categoriaID}>{categoria.nom_categoria}</option>
                ))}
            </select>
            <select
                value={entrada.proveedor ? entrada.proveedor.id_proveedor : ''}
                onChange={e => setEntrada({ ...entrada, proveedor: proveedores.find(p => p.id_proveedor === parseInt(e.target.value)) })}
                required
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
                placeholder="Cantidad"
                value={entrada.cantidad}
                onChange={e => setEntrada({ ...entrada, cantidad: parseInt(e.target.value) })}
                required
            />
            <input
                type="date"
                placeholder="Fecha"
                value={entrada.fecha}
                onChange={e => setEntrada({ ...entrada, fecha: e.target.value })}
                required
            />
            <input
                type="number"
                placeholder="Precio Unidad Compra"
                value={entrada.precio_unidad_compra}
                onChange={e => setEntrada({ ...entrada, precio_unidad_compra: parseFloat(e.target.value) })}
                required
            />
            <button type="submit">Actualizar Entrada</button>
            <button type="button" onClick={() => navigate('/entradas/')}>Cancelar</button>
        </form>
    );
};

export default UpdateEntrada;
