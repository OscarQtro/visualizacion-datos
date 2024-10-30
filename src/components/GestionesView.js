import React, { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { collection, onSnapshot, updateDoc, doc, deleteDoc } from "firebase/firestore";

const GestionesView = () => {
  const [gestiones, setGestiones] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "gestiones"), (snapshot) => {
      const gestionesList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setGestiones(gestionesList);
    });

    // Cleanup function
    return () => unsubscribe();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    const gestionRef = doc(db, "gestiones", id);
    await updateDoc(gestionRef, { status: newStatus });
    setGestiones((prevGestiones) =>
      prevGestiones.map((gestion) =>
        gestion.id === id ? { ...gestion, status: newStatus } : gestion
      )
    );
  };

  const handleDelete = async (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar esta gestión?")) {
      await deleteDoc(doc(db, "gestiones", id));
      setGestiones((prevGestiones) =>
        prevGestiones.filter((gestion) => gestion.id !== id)
      );
    }
  };

  return (
    <div className="data-container">
      <h2>Gestiones</h2>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Edad</th>
            <th>Teléfono</th>
            <th>Discapacidad</th>
            <th>Calle</th>
            <th>Colonia</th>
            <th>Código Postal</th>
            <th>Calles</th>
            <th>Gestor</th>
            <th>Prioridad</th>
            <th>Tipo</th>
            <th>Descripción</th>
            <th>Notas</th>
            <th>Fecha</th>
            <th>Estado</th>
            <th>Acciones</th> {/* Nueva columna para las acciones */}
          </tr>
        </thead>
        <tbody>
          {gestiones.map((gestion) => (
            <tr key={gestion.id}>
              <td>{gestion.nombre}</td>
              <td>{gestion.edad}</td>
              <td>{gestion.telefono}</td>
              <td>{gestion.discapacidad}</td>
              <td>{gestion.calle}</td>
              <td>{gestion.colonia}</td>
              <td>{gestion.codigo_postal}</td>
              <td>{gestion.entre_calles}</td>
              <td>{gestion.gestor}</td>
              <td>{gestion.prioridad}</td>
              <td>{gestion.tipo}</td>
              <td>{gestion.descripcion}</td>
              <td>{gestion.nota}</td>
              <td>{gestion.fecha}</td>
              <td>
                <select
                  value={gestion.status || "Sin realizar"}
                  onChange={(e) => handleStatusChange(gestion.id, e.target.value)}
                >
                  <option value="Sin realizar">Sin realizar</option>
                  <option value="En proceso">En proceso</option>
                  <option value="Completadas">Completadas</option>
                </select>
              </td>
              <td>
                <button onClick={() => handleDelete(gestion.id)} className="delete-button">
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

export default GestionesView;

