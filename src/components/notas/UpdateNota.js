import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../api';
import '../formStyle.css';

const UpdateNota = () => {
    const { id_nota } = useParams();
    const navigate = useNavigate();
    
    const [factura, setFactura] = useState('');
    const [tipoNota, setTipoNota] = useState('');
    const [motivo, setMotivo] = useState('');
    const [valor, setValor] = useState(''); // Inicializar con cadena vacía
    const [productos, setProductos] = useState([{ producto: '', cantidad: '' }]);
    const [facturas, setFacturas] = useState([]);
    const [tiposNotas, setTiposNotas] = useState([]);
    const [productosDisponibles, setProductosDisponibles] = useState([]);

    useEffect(() => {
        const fetchNota = async () => {
            try {
                const response = await api.get(`/notas/${id_nota}/`);
                const { factura, tipo_nota, motivo, valor, productos } = response.data;
                setFactura(factura); 
                setTipoNota(tipo_nota); 
                setValor(valor ? valor : ''); // Si el valor es 0, lo dejamos vacío
                setMotivo(motivo); 
                setProductos(productos.map(p => ({ producto: p.producto, cantidad: p.cantidad })));
            } catch (error) {
                console.error("Error al cargar la nota:", error);
                alert('No se pudo cargar la nota');
            }
        };
        
        const fetchFacturas = async () => {
            try {
                const response = await api.get('/facturas/');
                setFacturas(response.data);
            } catch (error) {
                console.error("Error al cargar las facturas:", error);
            }
        };

        const fetchTiposNotas = async () => {
            try {
                const response = await api.get('/tipo-nota/');
                setTiposNotas(response.data);
            } catch (error) {
                console.error("Error al cargar los tipos de nota:", error);
            }
        };

        const fetchProductos = async () => {
            try {
                const response = await api.get('/productos/');
                setProductosDisponibles(response.data);
            } catch (error) {
                console.error("Error al cargar los productos:", error);
            }
        };

        fetchNota();
        fetchFacturas();
        fetchTiposNotas();
        fetchProductos();
    }, [id_nota]);

    const handleProductoChange = (index, e) => {
        const values = [...productos];
        values[index][e.target.name] = e.target.value;
        setProductos(values);
    };

    const addProducto = () => {
        setProductos([...productos, { producto: '', cantidad: '' }]);
    };

    const removeProducto = (index) => {
        const values = [...productos];
        values.splice(index, 1);
        setProductos(values);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const updatedNota = {
                factura,
                tipo_nota: tipoNota,
                motivo,
                valor: valor || null, // Enviar como null si el valor está vacío
                productos: productos.map(prod => ({
                    producto: prod.producto,
                    cantidad: prod.cantidad,
                })),
            };

            await api.put(`/notas/${id_nota}/`, updatedNota);
            alert('Nota actualizada correctamente');
            navigate('/notas/');
        } catch (error) {
            console.error("Error al actualizar la nota:", error);
            alert("Error al actualizar la nota");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Actualizar Nota</h2>
            
            <select value={factura} onChange={(e) => setFactura(e.target.value)} required>
                <option value="">Selecciona una factura</option>
                {facturas.map(factura => (
                    <option key={factura.id_factura} value={factura.id_factura}>
                        {factura.id_factura}
                    </option>
                ))}
            </select>

            <select value={tipoNota} onChange={(e) => setTipoNota(e.target.value)} required>
                <option value="">Selecciona un tipo de nota</option>
                {tiposNotas.map(tipo => (
                    <option key={tipo.id_tipo_nota} value={tipo.id_tipo_nota}>
                        {tipo.nom_nota}
                    </option>
                ))}
            </select>

            <textarea 
                value={motivo} 
                onChange={(e) => setMotivo(e.target.value)} 
                placeholder="Motivo de la nota" 
                required 
            />
            <input 
                type="number" 
                value={valor} 
                onChange={(e) => setValor(e.target.value)} 
                placeholder="Valor (opcional)" 
            />

            <h3>Productos de la Nota</h3>
            {productos.map((producto, index) => (
                <div key={index}>
                    <select 
                        name="producto" 
                        value={producto.producto} 
                        onChange={(e) => handleProductoChange(index, e)} 
                    >
                        <option value="">Selecciona un producto</option>
                        {productosDisponibles.map(prod => (
                            <option key={prod.id_producto} value={prod.id_producto}>
                                {prod.nombre_producto}
                            </option>
                        ))}
                    </select>
                    <input 
                        type="number" 
                        name="cantidad" 
                        placeholder="Cantidad" 
                        value={producto.cantidad} 
                        onChange={(e) => handleProductoChange(index, e)} 
                    />
                    <button type="button" onClick={() => removeProducto(index)}>Eliminar</button>
                </div>
            ))}
            <button type="button" className="add-product" onClick={addProducto}>Agregar Producto</button>

            <button type="submit">Actualizar Nota</button>
            <button type="button" onClick={() => navigate('/notas/')}>Cancelar</button>
        </form>
    );
};

export default UpdateNota;
