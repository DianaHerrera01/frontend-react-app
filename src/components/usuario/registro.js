import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom"; 
import '../formStyle.css';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    first_name: "",
    last_name: "",
    password: "",
    password2: "",
  });
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false); // Estado para mostrar u ocultar la contraseña
  const [showPassword2, setShowPassword2] = useState(false); // Estado para mostrar u ocultar la confirmación de la contraseña
  const navigate = useNavigate(); // hook para la navegación

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (formData.password !== formData.password2) {
      setError("Las contraseñas no coinciden.");
      return; // Evita que se envíe el formulario
    }
  
    try {
      const response = await axios.post("http://localhost:8001/registro/", formData);
      alert(response.data.mensaje); // Muestra el mensaje de éxito
      navigate("/login"); // Redirige al login después de registrarse
    } catch (err) {
      // Reinicia los valores del formulario al producirse un error
      setFormData({
        username: "",
        email: "",
        first_name: "",
        last_name: "",
        password: "",
        password2: "",
      });

      if (err.response?.data) {
        // Manejar errores específicos
        if (err.response.data.username) {
          setError("Este nombre de usuario ya está en uso. Por favor elige otro.");
        } else if (err.response.data.password) {
          setError("La contraseña es demasiado común. ¡Intenta con algo más seguro!");
        } else if (err.response.data.password2) {
          setError("Las contraseñas no coinciden.");
        } else {
          setError(err.response.data.detail || "Hubo un error al registrar el usuario, por favor intenta de nuevo.");
        }
      } else {
        setError("Error desconocido, por favor intenta más tarde.");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
        <h3>Registrarse</h3>
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
      <div>
        <label>Confirmar Contraseña</label>
        <div className="password-container">
          <input
            type={showPassword2 ? "text" : "password"} // Cambiar entre 'text' y 'password' para confirmar la contraseña
            name="password2"
            value={formData.password2}
            onChange={handleChange}
            required
          />
          {/* Ícono para mostrar/ocultar la confirmación de la contraseña */}
          <i
            className={`fas ${showPassword2 ? 'fa-eye-slash' : 'fa-eye'}`} // Cambia el ícono según el estado
            onClick={() => setShowPassword2(!showPassword2)} // Cambiar el estado de visibilidad
          ></i>
        </div>
      </div>
      <button type="submit">Crear cuenta</button>

      {error && (
        <div style={{ color: "red", marginTop: "10px", fontWeight: "bold" }}>
          {error}
        </div>
      )}
      <div style={{ marginTop: "10px" }}>
        <span>¿Ya tienes cuenta? </span>
        <Link to="/login" style={{ color: "blue", textDecoration: "underline" }}>
            Inicia sesión
        </Link>
      </div>
    </form>
  );
};

export default RegisterForm;
