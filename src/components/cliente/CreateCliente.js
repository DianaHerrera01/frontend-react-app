import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api'; 
import '../formStyle.css';

const CreateCliente = () => {
    const navigate = useNavigate();
    const [nombre_cliente, setNombreCliente] = useState('');
    const [apellidos_cliente, setApellidosCliente] = useState('');
    const [correo, setCorreo] = useState('');
    const [telefono, setTelefono] = useState('');
    const [documento_cli, setDocumentoCli] = useState('');
    const [id_tipo_docum, setIdTipoDocum] = useState(''); // Para el tipo de documento
    const [tiposDocumento, setTiposDocumento] = useState([]); // Para los tipos de documento

    useEffect(() => {
        const fetchTiposDocumento = async () => {
            try {
                const response = await api.get('/tipos-documento/'); 
                setTiposDocumento(response.data);
            } catch (error) {
                console.error("Error al obtener tipos de documento:", error);
            }
        };

        fetchTiposDocumento();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const nuevoCliente = {
                nombre_cliente,
                apellidos_cliente,
                correo,
                telefono,
                documento_cli,
                tipo_documento: id_tipo_docum,
            };

            await api.post('/clientes/', nuevoCliente);
            alert("Cliente creado exitosamente");
            navigate('/clientes/'); // Redirige a la lista de clientes
        } catch (error) {
            console.error("Error al crear el cliente:", error.response ? error.response.data : error.message);
            alert("Error al crear el cliente: " + (error.response && error.response.data ? JSON.stringify(error.response.data) : error.message));
        }
    };

    const handleCancel = () => {
        navigate('/clientes/'); // Redirige a la lista de clientes al cancelar
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Crear Cliente</h2>
            <input 
                type="text" 
                placeholder="Nombre del Cliente" 
                onChange={(e) => setNombreCliente(e.target.value)} 
                required 
            />
            <input 
                type="text" 
                placeholder="Apellidos del Cliente" 
                onChange={(e) => setApellidosCliente(e.target.value)} 
                required 
            />
            <select 
                onChange={(e) => setIdTipoDocum(e.target.value)} 
                required 
            >
                <option value="">Selecciona un Tipo de Documento</option>
                {tiposDocumento.map(tipo => (
                    <option key={tipo.id_tipo_docum} value={tipo.id_tipo_docum}>
                        {tipo.nom_tipo_doc}
                    </option>
                ))}
            </select>
            <input 
                type="text" 
                placeholder="Número de Documento" 
                onChange={(e) => setDocumentoCli(e.target.value)} 
                required 
            />
            <input 
                type="email" 
                placeholder="Correo" 
                onChange={(e) => setCorreo(e.target.value)} 
                required 
            />
            <input 
                type="tel" 
                placeholder="Teléfono" 
                onChange={(e) => setTelefono(e.target.value)} 
                required 
            />
            <button type="submit">Crear Cliente</button>
            <button type="button" onClick={handleCancel} style={{ marginLeft: '10px' }}>Cancelar</button>
        </form>
    );
};

export default CreateCliente;
