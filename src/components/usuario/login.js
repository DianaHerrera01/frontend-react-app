import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom"; 
import '../formStyle.css';

const LoginForm = ({ setToken }) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false); // Estado para mostrar u ocultar la contraseña
  const navigate = useNavigate(); // hook para la navegación

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevenir el comportamiento por defecto del formulario

    try {
      // Enviar los datos del formulario al backend
      const response = await axios.post("http://localhost:8001/login/", formData);

      // Almacenar el token de acceso en localStorage
      localStorage.setItem('token', response.data.access);

      // Mostrar un mensaje de éxito
      alert(response.data.mensaje);

      // Redirigir al home (o a otra ruta que necesites)
      navigate("/home");

    } catch (err) {
      // Traducir el mensaje de error del backend al español si es necesario
      let errorMessage = err.response?.data?.detail || "Error al iniciar sesión";

      // Verificar si el error es de usuario o contraseña incorrectos
      if (errorMessage === "No active account found with the given credentials") {
        errorMessage = "Usuario o contraseña incorrectos.";
      }

      // Mostrar el mensaje de error
      setError(errorMessage);

      // Limpiar los campos del formulario
      setFormData({
        username: "",
        password: "",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Iniciar sesión</h3>
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
        <label>Contraseña</label>
        <div className="password-container">
          <input
            type={showPassword ? "text" : "password"} // Cambiar entre 'text' y 'password'
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          {/* Ícono para mostrar/ocultar la contraseña */}
          <i
            className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`} // Cambia el ícono según el estado
            onClick={() => setShowPassword(!showPassword)} // Cambiar el estado de visibilidad
          ></i>
        </div>
      </div>
      <button type="submit">Ingresar</button>
      {error && (
        <div style={{ color: "red", marginTop: "10px", fontWeight: "bold" }}>
          {error}
        </div>
      )}
      <div style={{ marginTop: "10px" }}>
        <span>¿No tienes cuenta? </span>
        <Link to="/registro" style={{ color: "blue", textDecoration: "underline" }}>
          Regístrate
        </Link>
      </div>
    </form>
  );
};

export default LoginForm;
