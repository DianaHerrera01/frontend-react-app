import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../api'; 
import '../formStyle.css';

const UpdateFactura = () => {
    const { id_factura } = useParams();
    const navigate = useNavigate();
    
    const [cliente, setCliente] = useState('');
    const [tipoDocumento, setTipoDocumento] = useState('');
    const [fechaEmision, setFechaEmision] = useState('');
    const [detalles, setDetalles] = useState([{ producto: '', cantidad: '' }]);
    const [clientes, setClientes] = useState([]);
    const [tiposDocumento, setTiposDocumento] = useState([]);
    const [productos, setProductos] = useState([]);

    useEffect(() => {
        const fetchFactura = async () => {
            try {
                const response = await api.get(`/facturas/${id_factura}/`);
                const { cliente, tipo_documento, fecha_emision, detalles } = response.data;
                setCliente(cliente); // Asegúrate de que esto sea un ID
                setTipoDocumento(tipo_documento); // Asegúrate de que esto sea un ID
                setFechaEmision(fecha_emision);
                setDetalles(detalles.map(d => ({ producto: d.producto, cantidad: d.cantidad }))); // Asegúrate de que 'producto' sea el ID
            } catch (error) {
                console.error("Error al cargar la factura:", error);
                alert('No se pudo cargar la factura');
            }
        };

        const fetchClientes = async () => {
            try {
                const response = await api.get('/clientes/');
                setClientes(response.data);
            } catch (error) {
                console.error("Error al cargar los clientes:", error);
            }
        };

        const fetchTiposDocumento = async () => {
            try {
                const response = await api.get('/tipos-documento/');
                setTiposDocumento(response.data);
            } catch (error) {
                console.error("Error al cargar los tipos de documento:", error);
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

        fetchFactura();
        fetchClientes();
        fetchTiposDocumento();
        fetchProductos();
    }, [id_factura]);

    const handleDetailChange = (index, e) => {
        const values = [...detalles];
        values[index][e.target.name] = e.target.value;
        setDetalles(values);
    };

    const addDetail = () => {
        setDetalles([...detalles, { producto: '', cantidad: '' }]);
    };

    const removeDetail = (index) => {
        const values = [...detalles];
        values.splice(index, 1);
        setDetalles(values);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const updatedFactura = {
                cliente,
                tipo_documento: tipoDocumento,
                fecha_emision: fechaEmision,
                detalles: detalles.map(detalle => ({
                    producto: detalle.producto,
                    cantidad: detalle.cantidad,
                })),
            };

            await api.put(`/facturas/${id_factura}/`, updatedFactura);
            alert('Factura actualizada correctamente');
            navigate('/facturas/');
        } catch (error) {
            console.error("Error al actualizar la factura:", error);
            alert("Error al actualizar la factura");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Actualizar Factura</h2>
            <select value={cliente} onChange={(e) => setCliente(e.target.value)} required>
                <option value="">Selecciona un cliente</option>
                {clientes.map(cliente => (
                    <option key={cliente.id_cliente} value={cliente.id_cliente}>
                        {cliente.nombre_cliente} {cliente.apellidos_cliente}
                    </option>
                ))}
            </select>

            <select value={tipoDocumento} onChange={(e) => setTipoDocumento(e.target.value)} required>
                <option value="">Selecciona un tipo de documento</option>
                {tiposDocumento.map(tipo => (
                    <option key={tipo.id_tipo_docum} value={tipo.id_tipo_docum}>
                        {tipo.nom_tipo_doc}
                    </option>
                ))}
            </select>

            <input 
                type="date" 
                placeholder="Fecha de Emisión" 
                value={fechaEmision} 
                onChange={(e) => setFechaEmision(e.target.value)} 
                required 
            />

            <h3>Detalles de la Factura</h3>
            {detalles.map((detalle, index) => (
                <div key={index}>
                    <select 
                        name="producto" 
                        value={detalle.producto} 
                        onChange={(e) => handleDetailChange(index, e)} 
                        required
                    >
                        <option value="">Selecciona un producto</option>
                        {productos.map(producto => (
                            <option key={producto.id_producto} value={producto.id_producto}>
                                {producto.nombre_producto}
                            </option>
                        ))}
                    </select>
                    <input 
                        type="number" 
                        name="cantidad" 
                        placeholder="Cantidad" 
                        value={detalle.cantidad} 
                        onChange={(e) => handleDetailChange(index, e)} 
                        required 
                    />
                    <button type="button" onClick={() => removeDetail(index)}>Eliminar</button>
                </div>
            ))}
            <button type="button" className="add-detail" onClick={addDetail}>Agregar Detalle</button>

            <button type="submit">Actualizar Factura</button>
            <button type="button" onClick={() => navigate('/facturas/')}>Cancelar</button>
        </form>
    );
};

export default UpdateFactura;
