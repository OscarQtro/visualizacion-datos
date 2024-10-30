import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App"; // Tu componente principal
import SolicitudesView from "./components/SolicitudesView"; // Componente para solicitudes
import GestionesView from "./components/GestionesView"; // Componente para gestiones

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Router>
    <Routes>
      <Route path="/" element={<App />} /> {/* Ruta principal */}
      <Route path="/solicitudes" element={<SolicitudesView />} /> {/* Ruta para Solicitudes */}
      <Route path="/gestiones" element={<GestionesView />} /> {/* Ruta para Gestiones */}
    </Routes>
  </Router>
);

