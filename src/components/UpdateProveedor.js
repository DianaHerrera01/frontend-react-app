import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api';
import './formStyle.css';

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
    
    useEffect(() => {
        const fetchProveedor = async () => {
            try {
                const response = await api.get(`/proveedores/${id_proveedor}/`);
                setProveedor(response.data);
            } catch (error) {
                console.error("Error al cargar el proveedor:", error);
                alert('No se pudo cargar el proveedor');
            }
        };

        fetchProveedor();
    }, [id_proveedor]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const updatedProveedor = {
                nombre_proveedor: proveedor.nombre_proveedor,
                apellidos_proveedor: proveedor.apellidos_proveedor,
                correo: proveedor.correo,
                direccion: proveedor.direccion,
                telefono: proveedor.telefono,
            };

            console.log('Proveedor a actualizar:', updatedProveedor);
            await api.put(`/proveedores/${id_proveedor}/`, updatedProveedor);
            alert('Proveedor actualizado correctamente');
            navigate('/proveedores/'); // Redirigir a la lista de proveedores
        } catch (error) {
            console.error('Error al actualizar el proveedor:', error.response ? error.response.data : error.message);
            alert('Error al actualizar el proveedor');
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
            <button type="submit">Actualizar Proveedor</button>
            <button type="button" onClick={() => navigate('/proveedores/')}>Cancelar</button>
        </form>
    );
};

export default UpdateProveedor;
