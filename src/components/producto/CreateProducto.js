import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import api from '../../api'; 
import '../formStyle.css';

const CreateProducto = () => {
    const navigate = useNavigate(); // Inicializa useNavigate
    const [nombre_producto, setNombreProducto] = useState('');
    const [cantidad, setCantidad] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [categoria, setCategoria] = useState('');
    const [proveedor, setProveedor] = useState('');
    const [preciounidadcompra, setPrecioUnidadCompra] = useState('');
    const [preciounidadventa, setPrecioUnidadVenta] = useState('');
    const [categorias, setCategorias] = useState([]);
    const [proveedores, setProveedores] = useState([]);

    // Cargar categorías y proveedores al montar el componente
    useEffect(() => {
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

        fetchCategorias();
        fetchProveedores();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const nuevoProducto = {
                nombre_producto,
                cantidad,
                descripcion,
                categoria,
                proveedor,
                preciounidadcompra,
                preciounidadventa,
            };

            await api.post('/productos/', nuevoProducto);
            alert("Producto creado exitosamente");
            navigate('/productos/'); // Redirige a la lista de productos
        } catch (error) {
            console.error("Error al crear el producto:", error);
            alert("Error al crear el producto");
        }
    };

    const handleCancel = () => {
        navigate('/productos/'); // Redirige a la lista de productos al cancelar
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Crear Producto</h2>
            <input 
                type="text" 
                placeholder="Nombre del Producto" 
                onChange={(e) => setNombreProducto(e.target.value)} 
                required 
            />
            <input 
                type="number" 
                placeholder="Cantidad" 
                onChange={(e) => setCantidad(e.target.value)} 
                required 
            />
            <textarea 
                placeholder="Descripción" 
                onChange={(e) => setDescripcion(e.target.value)} 
                required 
            />
            <select 
                value={categoria} 
                onChange={e => setCategoria(e.target.value)} 
                required
            >
                <option value="">Selecciona una categoría</option>
                {categorias.map(categoria => (
                    <option key={categoria.categoriaID} value={categoria.categoriaID}>
                        {categoria.nom_categoria}
                    </option>
                ))}
            </select>
            <select 
                value={proveedor} 
                onChange={e => setProveedor(e.target.value)} 
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
                placeholder="Precio Unidad Compra" 
                onChange={(e) => setPrecioUnidadCompra(e.target.value)} 
                required 
            />
            <input 
                type="number" 
                placeholder="Precio Unidad Venta" 
                onChange={(e) => setPrecioUnidadVenta(e.target.value)} 
                required 
            />
            <button type="btn-create">Crear Producto</button>
            <button type="button" onClick={handleCancel} style={{ marginLeft: '10px' }}>Cancelar</button>
        </form>
    );
};

export default CreateProducto;
