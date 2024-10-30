import React, { useState, useEffect } from "react";
import Login from "./components/Login";
import { auth } from "./firebaseConfig";
import { onAuthStateChanged, signOut } from "firebase/auth";
import SolicitudesView from "./components/SolicitudesView";
import GestionesView from "./components/GestionesView";
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [showSolicitudes, setShowSolicitudes] = useState(false);
  const [showGestiones, setShowGestiones] = useState(false);

  // Detecta el estado de autenticación
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleSolicitudes = () => {
    setShowSolicitudes(true);
    setShowGestiones(false);
  };

  const handleGestiones = () => {
    setShowGestiones(true);
    setShowSolicitudes(false);
  };

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
  };

  return (
    <div className="App">
      {user ? (
        <div>
          <div className="header">
            <h1>Gestiones Pepe Shanghái</h1>
            <div className="user-info">
              <span>Bienvenido, {user.email}</span>
              <button onClick={handleLogout} className="logout-button">Cerrar sesión</button>
            </div>
          </div>
          <div className="button-container">
            <button onClick={handleSolicitudes}>Solicitudes</button>
            <button onClick={handleGestiones}>Gestiones</button>
          </div>
          <div className="data-view">
            {showSolicitudes && <SolicitudesView />}
            {showGestiones && <GestionesView />}
          </div>
        </div>
      ) : (
        <Login setUser={setUser} />
      )}
    </div>
  );
}

export default App;


