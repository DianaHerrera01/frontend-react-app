import React, { useState, useEffect } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';
import './formStyle.css';

const DeleteFactura = () => {
    const [facturas, setFacturas] = useState([]);
    const [idFactura, setIdFactura] = useState('');
    const [loading, setLoading] = useState(true); // Estado de carga
    const navigate = useNavigate();

    useEffect(() => {
        const fetchFacturas = async () => {
            try {
                const response = await api.get('/facturas/');
                setFacturas(response.data);
            } catch (error) {
                console.error('Error al obtener facturas', error);
                alert('Error al cargar facturas');
            } finally {
                setLoading(false); // Cambia el estado de carga
            }
        };

        fetchFacturas();
    }, []);

    const handleDelete = async (e) => {
        e.preventDefault();

        try {
            await api.delete(`/facturas/${idFactura}/`);
            alert('Factura eliminada correctamente');
            setIdFactura('');
            navigate('/facturas/');
        } catch (error) {
            console.error('Hubo un error al eliminar la factura', error);
            alert('Error al eliminar la factura. Por favor, inténtalo de nuevo.');
        }
    };

    const handleCancel = () => {
        navigate('/facturas/');
    };

    if (loading) {
        return <p>Cargando facturas...</p>; // Mensaje de carga
    }

    return (
        <form onSubmit={handleDelete}>
            <h3>Eliminar Factura</h3>
            <select value={idFactura} onChange={e => setIdFactura(e.target.value)} required>
                <option value="">Selecciona una factura</option>
                {facturas.map(factura => (
                    <option key={factura.id_factura} value={factura.id_factura}>
                        {factura.id_factura} - {factura.cliente.nombre_cliente} {factura.cliente.apellidos_cliente} - Precio Total: {factura.precio_total_venta}
                    </option>
                ))}
            </select>
            <button type="submit">Eliminar Factura</button>
            <button type="button" onClick={handleCancel}>Cancelar</button>
        </form>
    );
};

export default DeleteFactura;
