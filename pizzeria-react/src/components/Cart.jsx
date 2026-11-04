
export default function Cart({
  carrito,
  cliente,
  setCliente,
  quitarPizza,
  guardarPedido,
  mesaSeleccionada
}) {
  const total = carrito.reduce(
    (suma, pizza) => suma + pizza.precio,
    0
  );

  return (
    <section className="cart-section">

      <h2>🛒 Nuevo pedido</h2>

      <label>Nombre del cliente</label>

      <input
        type="text"
        placeholder="Escribe el nombre del cliente"
        value={cliente}
        onChange={(e) => setCliente(e.target.value)}
      />

      <p>
        Mesa seleccionada:{" "}
        <strong>
          {mesaSeleccionada
            ? `Mesa ${mesaSeleccionada}`
            : "Ninguna"}
        </strong>
      </p>

      <h3>Detalle del pedido</h3>

      {carrito.length === 0 ? (
        <p>No hay pizzas agregadas.</p>
      ) : (
        carrito.map((pizza, index) => (
          <div className="cart-item" key={index}>

            <span>
              {pizza.nombre} - {pizza.tamano}
            </span>

            <strong>
              ${pizza.precio.toLocaleString("es-CO")}
            </strong>

            <button onClick={() => quitarPizza(index)}>
              Quitar
            </button>

          </div>
        ))
      )}

      <h3>
        Total: ${total.toLocaleString("es-CO")}
      </h3>

      <button
        className="guardar-btn"
        onClick={guardarPedido}
      >
        Guardar pedido
      </button>

    </section>
  );
}
