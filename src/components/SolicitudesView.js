import React, { useEffect, useState } from "react";
import { db } from "../firebaseConfig"; // Importa tu configuración de Firebase
import { collection, onSnapshot, updateDoc, doc, deleteDoc } from "firebase/firestore";

const SolicitudesView = () => {
  const [solicitudes, setSolicitudes] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "Solicitudes"), (snapshot) => {
      const solicitudesList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setSolicitudes(solicitudesList);
    });

    // Cleanup function
    return () => unsubscribe();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    const solicitudRef = doc(db, "Solicitudes", id);
    await updateDoc(solicitudRef, { status: newStatus });
    setSolicitudes((prevSolicitudes) =>
      prevSolicitudes.map((solicitud) =>
        solicitud.id === id ? { ...solicitud, status: newStatus } : solicitud
      )
    );
  };

  const handleDelete = async (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar esta solicitud?")) {
      await deleteDoc(doc(db, "Solicitudes", id));
      setSolicitudes((prevSolicitudes) =>
        prevSolicitudes.filter((solicitud) => solicitud.id !== id)
      );
    }
  };

  return (
    <div className="data-container">
      <h2>Solicitudes</h2>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Fecha Nacimiento</th>
            <th>Discapacidad</th>
            <th>Teléfono</th>
            <th>Colonia</th>
            <th>Calle</th>
            <th>Código Postal</th>
            <th>Calles</th>
            <th>Solicitud</th>
            <th>Estado</th>
            <th>Acciones</th> {/* Nueva columna para el botón de eliminación */}
          </tr>
        </thead>
        <tbody>
          {solicitudes.map((solicitud) => (
            <tr key={solicitud.id}>
              <td>{solicitud.nombre}</td>
              <td>{solicitud.fecha_nacimiento}</td>
              <td>{solicitud.discapacidad}</td>
              <td>{solicitud.telefono}</td>
              <td>{solicitud.colonia}</td>
              <td>{solicitud.calle}</td>
              <td>{solicitud.codigo_postal}</td>
              <td>{solicitud.entre_calles}</td>
              <td>{solicitud.solicitud}</td>
              <td>
                <select
                  value={solicitud.status || "Sin realizar"}
                  onChange={(e) => handleStatusChange(solicitud.id, e.target.value)}
                >
                  <option value="Sin realizar">Sin realizar</option>
                  <option value="En proceso">En proceso</option>
                  <option value="Completadas">Completadas</option>
                </select>
              </td>
              <td>
                <button onClick={() => handleDelete(solicitud.id)} className="delete-button">
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SolicitudesView;


