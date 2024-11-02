import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../api'; 
import '../formStyle.css';

const UpdateCliente = () => {
    const { id_cliente } = useParams();
    const navigate = useNavigate();

    const [cliente, setCliente] = useState({
        nombre_cliente: '',
        apellidos_cliente: '',
        correo: '',
        telefono: '',
        documento_cli: '',
        id_tipo_docum: null, // Almacena el ID del tipo de documento
    });

    const [tiposDocumento, setTiposDocumento] = useState([]);

    useEffect(() => {
        const fetchCliente = async () => {
            try {
                const response = await api.get(`/clientes/${id_cliente}/`);
                setCliente(response.data);
            } catch (error) {
                console.error("Error al cargar el cliente:", error);
                alert('No se pudo cargar el cliente');
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

        fetchCliente();
        fetchTiposDocumento();
    }, [id_cliente]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const updatedCliente = {
                nombre_cliente: cliente.nombre_cliente,
                apellidos_cliente: cliente.apellidos_cliente,
                correo: cliente.correo,
                telefono: cliente.telefono,
                documento_cli: cliente.documento_cli,
                tipo_documento: cliente.id_tipo_docum,
            };

            await api.put(`/clientes/${id_cliente}/`, updatedCliente);
            alert('Cliente actualizado correctamente');
            navigate('/clientes/'); // Redirigir a la lista de clientes
        }catch (error) {
            console.error("Error al crear el cliente:", error.response ? error.response.data : error.message);
            alert("Error al crear el cliente: " + (error.response && error.response.data ? JSON.stringify(error.response.data) : error.message));
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h3>Editar Cliente</h3>
            <input
                type="text"
                placeholder="Nombre del Cliente"
                value={cliente.nombre_cliente}
                onChange={e => setCliente({ ...cliente, nombre_cliente: e.target.value })}
                required
            />
            <input
                type="text"
                placeholder="Apellidos del Cliente"
                value={cliente.apellidos_cliente}
                onChange={e => setCliente({ ...cliente, apellidos_cliente: e.target.value })}
                required
            />
            <select
                value={cliente.id_tipo_docum || ''}
                onChange={e => setCliente({ ...cliente, id_tipo_docum: e.target.value })}
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
                value={cliente.documento_cli}
                onChange={e => setCliente({ ...cliente, documento_cli: e.target.value })}
                required
            />
            <input
                type="email"
                placeholder="Correo"
                value={cliente.correo}
                onChange={e => setCliente({ ...cliente, correo: e.target.value })}
                required
            />
            <input
                type="tel"
                placeholder="Teléfono"
                value={cliente.telefono}
                onChange={e => setCliente({ ...cliente, telefono: e.target.value })}
                required
            />
            <button type="submit">Actualizar Cliente</button>
            <button type="button" onClick={() => navigate('/clientes/')}>Cancelar</button>
        </form>
    );
};

export default UpdateCliente;
