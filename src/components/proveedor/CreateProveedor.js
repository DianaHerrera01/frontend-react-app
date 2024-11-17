import React, { useEffect, useState } from 'react'; 
import { useNavigate } from 'react-router-dom'; 
import api from '../../api'; 
import '../formStyle.css';

const CreateProveedor = () => {
    const navigate = useNavigate();
    const [nombre_proveedor, setNombreProveedor] = useState('');
    const [apellidos_proveedor, setApellidosProveedor] = useState('');
    const [correo, setCorreo] = useState('');
    const [direccion, setDireccion] = useState('');
    const [telefono, setTelefono] = useState('');
    const [productosServicios, setProductosServicios] = useState([]); // Estado para productos-servicios seleccionados
    const [productosServiciosList, setProductosServiciosList] = useState([]); // Estado para la lista de productos-servicios

    useEffect(() => {
        // Cargar productos-servicios disponibles
        const fetchProductosServicios = async () => {
            try {
                const response = await api.get('/productos-servicios/');
                setProductosServiciosList(response.data); // Guardar los productos-servicios disponibles
            } catch (error) {
                console.error("Error al cargar los productos-servicios:", error);
            }
        };

        fetchProductosServicios();
    }, []);

    const handleProductoServicioChange = (e) => {
        const { value, checked } = e.target;
        setProductosServicios((prev) => {
            if (checked) {
                return [...prev, value]; // Agregar el valor si se selecciona
            } else {
                return prev.filter((item) => item !== value); // Eliminar el valor si se deselecciona
            }
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const nuevoProveedor = {
                nombre_proveedor,
                apellidos_proveedor,
                correo,
                direccion,
                telefono,
                productos_servicios: productosServicios, // Incluir productos-servicios seleccionados
            };

            await api.post('/proveedores/', nuevoProveedor);
            alert("Proveedor creado exitosamente");
            navigate('/proveedores/');
        } catch (error) {
            console.error("Error al crear el proveedor:", error);
            alert("Error al crear el proveedor");
        }
    };

    const handleCancel = () => {
        navigate('/proveedores/');
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Crear Proveedor</h2>
            <input 
                type="text" 
                placeholder="Nombre del Proveedor" 
                onChange={(e) => setNombreProveedor(e.target.value)} 
                required 
            />
            <input 
                type="text" 
                placeholder="Apellidos del Proveedor" 
                onChange={(e) => setApellidosProveedor(e.target.value)} 
                required 
            />
            <input 
                type="email" 
                placeholder="Correo" 
                onChange={(e) => setCorreo(e.target.value)} 
                required 
            />
            <input 
                type="text" 
                placeholder="Dirección" 
                onChange={(e) => setDireccion(e.target.value)} 
                required 
            />
            <input 
                type="tel" 
                placeholder="Teléfono" 
                onChange={(e) => setTelefono(e.target.value)} 
                required 
            />
            
            <h3>Productos/Servicios</h3>
            <div className="checkbox-group">
                {productosServiciosList.map((producto) => (
                    <div key={producto.id_producto_servicio}>
                        <label>
                            <input
                                type="checkbox"
                                value={producto.id_producto_servicio}
                                onChange={handleProductoServicioChange}
                            />
                            {producto.nom_producto_serv}
                        </label>
                    </div>
                ))}
            </div>

            <button type="submit">Crear Proveedor</button>
            <button type="button" onClick={handleCancel} style={{ marginLeft: '10px' }}>Cancelar</button>
        </form>
    );
};

export default CreateProveedor;
