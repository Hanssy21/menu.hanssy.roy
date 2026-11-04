
import { useEffect, useState } from "react";

export default function Timer({ creado, duracion, entregado }) {

  const calcularTiempo = () => {
    const restante = Math.max(
      0,
      creado + duracion - Date.now()
    );

    return restante;
  };

  const [tiempo, setTiempo] = useState(calcularTiempo);

  useEffect(() => {
    if (entregado) return;

    const intervalo = setInterval(() => {
      setTiempo(calcularTiempo());
    }, 1000);

    return () => clearInterval(intervalo);

  }, [creado, duracion, entregado]);

  const minutos = Math.floor(tiempo / 60000);

  const segundos = Math.floor(
    (tiempo % 60000) / 1000
  );

  return (
    <div className="timer">

      {entregado ? (
        <h3>✅ Pedido entregado</h3>
      ) : tiempo > 0 ? (
        <>
          <h3>⏱ Tiempo restante</h3>

          <strong>
            {String(minutos).padStart(2, "0")}:
            {String(segundos).padStart(2, "0")}
          </strong>
        </>
      ) : (
        <h3 className="tiempo-agotado">
          ⚠️ ¡Pedido listo para entregar!
        </h3>
      )}

    </div>
  );
}
