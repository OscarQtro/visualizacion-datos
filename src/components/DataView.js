import React, { useEffect, useState } from "react";
import { db } from "../firebaseConfig"; // Asegúrate de que esto apunte a tu configuración de Firebase
import { collection, onSnapshot } from "firebase/firestore";
import "./DataView.css"; // Agrega estilos si deseas

const DataView = () => {
  const [data, setData] = useState([]); // Estado para almacenar los datos
  const [loading, setLoading] = useState(true); // Estado para manejar la carga

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "Solicitudes"), // Nombre de tu colección
      (snapshot) => {
        const dataList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setData(dataList); // Almacena los datos en el estado
        setLoading(false); // Cambia el estado de carga
      },
      (error) => {
        console.error("Error al obtener los datos: ", error);
        setLoading(false); // Asegúrate de cambiar el estado de carga si hay un error
      }
    );

    // Limpia el listener cuando el componente se desmonta
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <p>Cargando datos...</p>; // Mensaje mientras se cargan los datos
  }

  return (
    <div className="data-view">
      <h2>Visualización de Solicitudes</h2>
      {data.length === 0 ? (
        <p>No hay solicitudes disponibles.</p> // Mensaje si no hay datos
      ) : (
        <ul>
          {data.map((item) => (
            <li key={item.id}>
              <strong>ID:</strong> {item.id} <br />
              <strong>Nombre:</strong> {item.nombre} <br />
              <strong>Solicitud:</strong> {item.solicitud} <br />
              <strong>Fecha:</strong> {item.fecha} <br />
              {/* Agrega otros campos que quieras mostrar */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DataView;

