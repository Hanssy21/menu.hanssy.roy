
import Timer from "./Timer";

export default function Orders({ pedidos, marcarEntregado }) {

  return (
    <section className="orders-section">

      <h2>📋 Pedidos del restaurante</h2>

      {pedidos.length === 0 ? (

        <p>No hay pedidos registrados todavía.</p>

      ) : (

        pedidos.map((pedido) => (

          <article className="order-card" key={pedido.id}>

            <div className="order-header">

              <h3>
                🪑 Mesa {pedido.mesa}
              </h3>

              <span>
                Cliente: {pedido.cliente}
              </span>

            </div>

            <h4>🍕 Productos solicitados</h4>

            {pedido.items.map((item, index) => (

              <p key={index}>
                {item.nombre} - {item.tamano}
                {" | "}
                ${item.precio.toLocaleString("es-CO")}
              </p>

            ))}

            <h3>
              Total: ${pedido.total.toLocaleString("es-CO")}
            </h3>

            <Timer
              creado={pedido.creado}
              duracion={pedido.duracion}
              entregado={pedido.entregado}
            />

            {!pedido.entregado && (

              <button
                className="entregado-btn"
                onClick={() => marcarEntregado(pedido.id)}
              >
                Marcar como entregado
              </button>

            )}

          </article>

        ))

      )}

    </section>
  );
}
