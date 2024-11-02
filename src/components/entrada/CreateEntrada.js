import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import api from '../../api'; 
import '../formStyle.css';

const CreateEntrada = () => {
    const navigate = useNavigate(); // Inicializa useNavigate
    const [producto, setProducto] = useState('');
    const [cantidad, setCantidad] = useState('');
    const [fecha, setFecha] = useState('');
    const [proveedor, setProveedor] = useState('');
    const [categoria, setCategoria] = useState('');
    const [idOrdenPedido, setIdOrdenPedido] = useState(''); 
    const [categorias, setCategorias] = useState([]);
    const [proveedores, setProveedores] = useState([]);
    const [productosList, setProductosList] = useState([]); // Para almacenar productos
    const [pedidos, setPedidos] = useState([]); // Para almacenar pedidos

    // Cargar categorías, proveedores y productos al montar el componente
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

        const fetchProductos = async () => {
            try {
                const response = await api.get('/productos/');
                setProductosList(response.data);
            } catch (error) {
                console.error("Error al cargar los productos:", error);
            }
        };

        const fetchPedidos = async () => { // Función para cargar pedidos
            try {
                const response = await api.get('/pedidos/'); 
                setPedidos(response.data);
            } catch (error) {
                console.error("Error al cargar los pedidos:", error);
            }
        };

        fetchCategorias();
        fetchProveedores();
        fetchProductos();
        fetchPedidos(); // Llama la función para cargar pedidos
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const nuevaEntrada = {
                producto, 
                cantidad,
                fecha,
                proveedor, 
                categoria, 
                pedido: idOrdenPedido  
            };

            await api.post('/entradas/', nuevaEntrada);
            alert("Entrada creada exitosamente");
            navigate('/entradas/'); // Redirige a la lista de entradas
        } catch (error) {
            console.error("Error al crear la entrada:", error);
            alert("Error al crear la entrada");
        }
    };

    const handleCancel = () => {
        navigate('/entradas/'); // Redirige a la lista de entradas al cancelar
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Crear Entrada</h2>
            <select 
                value={idOrdenPedido} 
                onChange={e => setIdOrdenPedido(e.target.value)} 
                required
            >
                <option value="">Selecciona un pedido</option>
                {pedidos.map(ped => (
                    <option key={ped.id_orden_pedido} value={ped.id_orden_pedido}>
                        {ped.id_orden_pedido} {/* Muestra el id_orden_pedido aquí */}
                    </option>
                ))}
            </select>
            <select 
                value={producto} 
                onChange={e => setProducto(e.target.value)} 
                required
            >
                <option value="">Selecciona un producto</option>
                {productosList.map(prod => (
                    <option key={prod.id_producto} value={prod.id_producto}>
                        {prod.nombre_producto}
                    </option>
                ))}
            </select>
            <input 
                type="number" 
                placeholder="Cantidad" 
                onChange={(e) => setCantidad(e.target.value)} 
                required 
            />
            <input 
                type="date" 
                placeholder="Fecha" 
                onChange={(e) => setFecha(e.target.value)} 
                required 
            />
            <select 
                value={proveedor} 
                onChange={e => setProveedor(e.target.value)} 
                required
            >
                <option value="">Selecciona un proveedor</option>
                {proveedores.map(prov => (
                    <option key={prov.id_proveedor} value={prov.id_proveedor}>
                        {prov.nombre_proveedor} {prov.apellidos_proveedor}
                    </option>
                ))}
            </select>
            <select 
                value={categoria} 
                onChange={e => setCategoria(e.target.value)} 
                required
            >
                <option value="">Selecciona una categoría</option>
                {categorias.map(cat => (
                    <option key={cat.categoriaID} value={cat.categoriaID}>
                        {cat.nom_categoria}
                    </option>
                ))}
            </select>
            <button type="submit">Crear Entrada</button>
            <button type="button" onClick={handleCancel} style={{ marginLeft: '10px' }}>Cancelar</button>
        </form>
    );
};

export default CreateEntrada;
