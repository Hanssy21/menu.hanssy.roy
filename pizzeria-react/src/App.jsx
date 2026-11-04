
import { useState, useEffect } from "react";

import { pizzas, tamanos } from "./data/pizzas";

import PizzaCard from "./components/PizzaCard";
import Tables from "./components/Tables";
import Cart from "./components/Cart";
import Orders from "./components/Orders";

function App() {

  // Guardar y recuperar pedidos
  const [pedidos, setPedidos] = useState(() => {
    try {
      return JSON.parse(
        localStorage.getItem("pedidos") || "[]"
      );
    } catch {
      return [];
    }
  });

  // Mesa seleccionada
  const [mesaSeleccionada, setMesaSeleccionada] =
    useState(null);

  // Nombre del cliente
  const [cliente, setCliente] = useState("");

  // Productos del carrito
  const [carrito, setCarrito] = useState([]);

  // Guardar pedidos automáticamente
  useEffect(() => {
    localStorage.setItem(
      "pedidos",
      JSON.stringify(pedidos)
    );
  }, [pedidos]);

  // Agregar pizza al carrito
  function agregarPizza(pizza, tamano, precio) {

    setCarrito((actual) => [
      ...actual,
      {
        id: Date.now() + Math.random(),
        nombre: pizza.nombre,
        tamano: tamano.nombre,
        precio
      }
    ]);
  }

  // Quitar pizza
  function quitarPizza(index) {
    setCarrito((actual) =>
      actual.filter((_, i) => i !== index)
    );
  }

  // Guardar pedido
  function guardarPedido() {

    if (!cliente.trim()) {
      alert("Escribe el nombre del cliente.");
      return;
    }

    if (!mesaSeleccionada) {
      alert("Selecciona una mesa.");
      return;
    }

    if (carrito.length === 0) {
      alert("Agrega al menos una pizza.");
      return;
    }

    const mesaOcupada = pedidos.some(
      (pedido) =>
        pedido.mesa === mesaSeleccionada &&
        !pedido.entregado
    );

    if (mesaOcupada) {
      alert("Esta mesa ya tiene un pedido pendiente.");
      return;
    }

    const nuevoPedido = {
      id: Date.now(),
      cliente: cliente.trim(),
      mesa: mesaSeleccionada,
      items: [...carrito],
      total: carrito.reduce(
        (suma, item) => suma + item.precio,
        0
      ),
      creado: Date.now(),
      duracion: 30 * 60 * 1000,
      entregado: false
    };

    setPedidos((actual) => [
      ...actual,
      nuevoPedido
    ]);

    // Limpiar formulario
    setCliente("");
    setCarrito([]);
    setMesaSeleccionada(null);

    alert("¡Pedido guardado correctamente!");
  }

  // Marcar pedido como entregado
  function marcarEntregado(id) {

    setPedidos((actual) =>
      actual.map((pedido) =>
        pedido.id === id
          ? { ...pedido, entregado: true }
          : pedido
      )
    );
  }

  return (
    <div className="app">

      <header className="header">
  <h1>🍕 PIZZERÍA HANSSY ROY</h1>

  <p className="eslogan">
    El auténtico sabor de Hanssy Roy
  </p>

  <p className="subtitulo">
    Menú y administración de pedidos
  </p>
</header>

      <main className="container">

        {/* MESAS */}
        <Tables
          mesaSeleccionada={mesaSeleccionada}
          seleccionarMesa={setMesaSeleccionada}
          pedidos={pedidos}
        />

        {/* MENÚ */}
        <section className="menu-section">

          <h2>🍕 Nuestro menú</h2>

          {tamanos.map((tamano) => (

            <div key={tamano.id}>

              <h3>{tamano.nombre}</h3>

              <div className="menu-grid">

                {pizzas.map((pizza) => (

                  <PizzaCard
                    key={pizza.id}
                    pizza={pizza}
                    tamano={tamano}
                    agregar={agregarPizza}
                  />

                ))}

              </div>

            </div>

          ))}

        </section>

        {/* CARRITO */}
        <Cart
          carrito={carrito}
          cliente={cliente}
          setCliente={setCliente}
          quitarPizza={quitarPizza}
          guardarPedido={guardarPedido}
          mesaSeleccionada={mesaSeleccionada}
        />

        {/* PEDIDOS */}
        <Orders
          pedidos={pedidos}
          marcarEntregado={marcarEntregado}
        />

      </main>

      <footer>
        <p>🍕 Pizzería Digital © 2026</p>
      </footer>

    </div>
  );
}

export default App;
