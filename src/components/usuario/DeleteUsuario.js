import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../formStyle.css';

const DeleteUsuario = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [usuarioID, setUsuarioID] = useState('');
    const navigate = useNavigate(); // Inicializar useNavigate

    useEffect(() => {
        // Obtener la lista de usuarios al montar el componente
        const fetchUsuarios = async () => {
            try {
                const response = await axios.get('http://localhost:8001/registro/'); // Cambié la URL aquí
                setUsuarios(response.data);
            } catch (error) {
                console.error('Error al obtener usuarios', error);
                alert('Error al cargar usuarios'); // Mensaje de error si falla la carga
            }
        };

        fetchUsuarios();
    }, []);

    const handleDelete = async (e) => {
        e.preventDefault();

        try {
            // Realizar la solicitud DELETE con el pk (usuarioID)
            await axios.delete(`http://localhost:8001/registro/${usuarioID}/`);
            alert('Usuario eliminado correctamente'); // Mensaje de éxito
            setUsuarioID(''); // Limpia el campo después de eliminar

            // Redirigir a la lista de usuarios después de eliminar
            navigate('/usuarios/'); // Redirigir a la ruta de la lista de usuarios
        } catch (error) {
            console.error('Hubo un error al eliminar el usuario', error);
            alert('Error al eliminar el usuario'); // Mensaje de error
        }
    };

    const handleCancel = () => {
        navigate('/usuarios/'); // Redirigir a la ruta de la lista de usuarios al cancelar
    };

    return (
        <form onSubmit={handleDelete}>
            <h3>Eliminar Usuario</h3>
            <select value={usuarioID} onChange={e => setUsuarioID(e.target.value)} required>
                <option value="">Selecciona un usuario</option>
                {usuarios.map(usuario => (
                    <option key={usuario.id} value={usuario.id}>
                        {usuario.username} - {usuario.first_name} {usuario.last_name}
                    </option>
                ))}
            </select>
            <button type="submit">Eliminar Usuario</button>
            <button type="button" onClick={handleCancel}>Cancelar</button>
        </form>
    );
};

export default DeleteUsuario;
