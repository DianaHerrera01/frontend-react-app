import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import '../formStyle.css';

const UpdateUsuario = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    first_name: "",
    last_name: "",
    password: "",
    password2: "",
  });
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const navigate = useNavigate();
  const { pk } = useParams();

  // Cargar datos existentes del usuario
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:8001/registro/${pk}/`);
        const userData = response.data;
        setFormData({
          username: userData.username || "",
          email: userData.email || "",
          first_name: userData.first_name || "",
          last_name: userData.last_name || "",
          password: "", // No cargamos la contraseña por seguridad
          password2: "",
        });
      } catch (err) {
        setError("Hubo un error al cargar los datos del usuario.");
      }
    };

    fetchUserData();
  }, [pk]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.password2) {
      setError("Las contraseñas no coinciden.");
      return;
    }
    try {
      const response = await axios.put(`http://localhost:8001/registro/${pk}/`, formData);
      alert(response.data.mensaje || "Usuario actualizado con éxito.");
      navigate("/usuarios");
    } catch (err) {
      setError("Hubo un error al actualizar el usuario, por favor intenta más tarde.");
    }
  };

  const handleCancel = () => {
    navigate("/usuarios");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Actualizar Usuario</h3>
      <div>
        <label>Usuario</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Nombre</label>
        <input
          type="text"
          name="first_name"
          value={formData.first_name}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Apellido</label>
        <input
          type="text"
          name="last_name"
          value={formData.last_name}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Contraseña</label>
        <div className="password-container">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            
          />
          <i
            className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}
            onClick={() => setShowPassword(!showPassword)}
          ></i>
        </div>
      </div>
      <div>
        <label>Confirmar Contraseña</label>
        <div className="password-container">
          <input
            type={showPassword2 ? "text" : "password"}
            name="password2"
            value={formData.password2}
            onChange={handleChange}
            
          />
          <i
            className={`fas ${showPassword2 ? 'fa-eye-slash' : 'fa-eye'}`}
            onClick={() => setShowPassword2(!showPassword2)}
          ></i>
        </div>
      </div>

      <div>
        <button type="submit">Actualizar Usuario</button>
        <button type="button" onClick={handleCancel} style={{ marginLeft: '10px' }}>
          Cancelar
        </button>
      </div>

      {error && (
        <div style={{ color: "red", marginTop: "10px", fontWeight: "bold" }}>
          {error}
        </div>
      )}
    </form>
  );
};

export default UpdateUsuario;
