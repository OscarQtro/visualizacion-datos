import React, { useState } from "react";
import { auth } from "../firebaseConfig";  // Importa el objeto `auth` de tu configuración de Firebase
import { signInWithEmailAndPassword } from "firebase/auth";
import "./Login.css"; // Importa el CSS

const Login = ({ setUser }) => {
  const [email, setEmail] = useState("");         // Estado para el email
  const [password, setPassword] = useState("");   // Estado para la contraseña
  const [error, setError] = useState("");         // Estado para manejar errores

  // Función para manejar el inicio de sesión
  const handleLogin = async (e) => {
    e.preventDefault();   // Evita el envío del formulario por defecto
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);   // Guarda el usuario en el estado para manejar el acceso
    } catch (error) {
      setError("Inicio de sesión fallido: " + error.message);   // Muestra un error en caso de fallo
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Iniciar Sesión</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Iniciar Sesión</button>
          {error && <p>{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default Login;

