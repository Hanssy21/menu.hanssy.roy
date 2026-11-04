
export default function Tables({
  mesaSeleccionada,
  seleccionarMesa,
  pedidos
}) {
  return (
    <section className="tables-section">

      <h2>🪑 Mesas del restaurante</h2>

      <div className="tables-grid">

        {Array.from({ length: 12 }, (_, index) => {
          const numero = index + 1;

          const ocupada = pedidos.some(
            pedido =>
              pedido.mesa === numero &&
              !pedido.entregado
          );

          return (
            <button
              key={numero}
              className={`mesa ${
                mesaSeleccionada === numero
                  ? "selected"
                  : ""
              } ${ocupada ? "ocupada" : "libre"}`}

              onClick={() => seleccionarMesa(numero)}
            >
              <span>🪑</span>

              <strong>Mesa {numero}</strong>

              <small>
                {ocupada ? "Ocupada 🔴" : "Libre 🟢"}
              </small>
            </button>
          );
        })}

      </div>
    </section>
  );
}
