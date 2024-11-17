import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../api'; 
import '../formStyle.css';

const UpdateProveedor = () => {
    const { id_proveedor } = useParams();
    const navigate = useNavigate();

    const [proveedor, setProveedor] = useState({
        nombre_proveedor: '',
        apellidos_proveedor: '',
        correo: '',
        direccion: '',
        telefono: '',
    });

    const [productosServicios, setProductosServicios] = useState([]); // Estado para productos-servicios seleccionados
    const [productosServiciosList, setProductosServiciosList] = useState([]); // Lista de productos-servicios disponibles

    useEffect(() => {
        const fetchProveedor = async () => {
            try {
                const response = await api.get(`/proveedores/${id_proveedor}/`);
                setProveedor(response.data);
                if (response.data.productos_servicios) {
                    setProductosServicios(response.data.productos_servicios.map((item) => item.id_producto_servicio));
                }
            } catch (error) {
                console.error("Error al cargar el proveedor:", error);
                alert('No se pudo cargar el proveedor');
            }
        };

        const fetchProductosServicios = async () => {
            try {
                const response = await api.get('/productos-servicios/');
                setProductosServiciosList(response.data);
            } catch (error) {
                console.error("Error al cargar los productos-servicios:", error);
            }
        };

        fetchProveedor();
        fetchProductosServicios();
    }, [id_proveedor]);

    const handleProductoServicioChange = (e) => {
        const { value, checked } = e.target;
        const idValue = parseInt(value, 10);

        setProductosServicios((prev) => {
            if (checked) {
                return [...prev, idValue];
            } else {
                return prev.filter((item) => item !== idValue);
            }
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const updatedProveedor = {
                ...proveedor,
                productos_servicios: productosServicios,
            };

            await api.put(`/proveedores/${id_proveedor}/`, updatedProveedor);
            alert('Proveedor actualizado correctamente');
            navigate('/proveedores/');
        } catch (error) {
            console.error('Error al actualizar el proveedor:', error.response ? error.response.data : error.message);
            alert('Error al actualizar el proveedor'+ (error.response && error.response.data ? JSON.stringify(error.response.data) : error.message));
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h3>Editar Proveedor</h3>
            <input
                type="text"
                placeholder="Nombre del proveedor"
                value={proveedor.nombre_proveedor}
                onChange={e => setProveedor({ ...proveedor, nombre_proveedor: e.target.value })}
                required
            />
            <input
                type="text"
                placeholder="Apellidos del proveedor"
                value={proveedor.apellidos_proveedor}
                onChange={e => setProveedor({ ...proveedor, apellidos_proveedor: e.target.value })}
                required
            />
            <input
                type="email"
                placeholder="Correo electrónico"
                value={proveedor.correo}
                onChange={e => setProveedor({ ...proveedor, correo: e.target.value })}
                required
            />
            <input
                type="text"
                placeholder="Dirección"
                value={proveedor.direccion}
                onChange={e => setProveedor({ ...proveedor, direccion: e.target.value })}
                required
            />
            <input
                type="tel"
                placeholder="Teléfono"
                value={proveedor.telefono}
                onChange={e => setProveedor({ ...proveedor, telefono: e.target.value })}
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
                                checked={productosServicios.includes(producto.id_producto_servicio)}
                                onChange={handleProductoServicioChange}
                            />
                            {producto.nom_producto_serv}
                        </label>
                    </div>
                ))}
            </div>

            <button type="submit">Actualizar Proveedor</button>
            <button type="button" onClick={() => navigate('/proveedores/')}>Cancelar</button>
        </form>
    );
};

export default UpdateProveedor;
