import React, { useEffect, useState } from 'react'; // Mantén useEffect
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import api from '../api'; 
import './formStyle.css';

const CreateProveedor = () => {
    const navigate = useNavigate(); // Inicializa useNavigate
    const [nombre_proveedor, setNombreProveedor] = useState('');
    const [apellidos_proveedor, setApellidosProveedor] = useState('');
    const [correo, setCorreo] = useState('');
    const [direccion, setDireccion] = useState('');
    const [telefono, setTelefono] = useState('');

    useEffect(() => {
        // Aquí podrías realizar alguna acción al cargar el componente
    }, []); // Dependencias vacías indican que solo se ejecutará al montar el componente

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const nuevoProveedor = {
                nombre_proveedor,
                apellidos_proveedor,
                correo,
                direccion,
                telefono,
            };

            await api.post('/proveedores/', nuevoProveedor);
            alert("Proveedor creado exitosamente");
            navigate('/proveedores/'); // Redirige a la lista de proveedores
        } catch (error) {
            console.error("Error al crear el proveedor:", error);
            alert("Error al crear el proveedor");
        }
    };

    const handleCancel = () => {
        navigate('/proveedores/'); // Redirige a la lista de proveedores al cancelar
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
            <button type="submit">Crear Proveedor</button>
            <button type="button" onClick={handleCancel} style={{ marginLeft: '10px' }}>Cancelar</button>
        </form>
    );
};

export default CreateProveedor;
