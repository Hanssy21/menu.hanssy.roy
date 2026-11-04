
import PizzaDrawing from "./PizzaDrawing";

export default function PizzaCard({ pizza, tamano, agregar }) {
  const precio = pizza.precios[tamano.id];

  return (
    <article className="pizza-card">

      <PizzaDrawing color={pizza.color} />

      <h3>{pizza.nombre}</h3>

      <p>{tamano.nombre}</p>

      <strong>
        ${precio.toLocaleString("es-CO")}
      </strong>

      <button onClick={() => agregar(pizza, tamano, precio)}>
        Agregar al pedido
      </button>

    </article>
  );
}
