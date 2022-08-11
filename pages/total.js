import { useCallback, useEffect } from "react";
import Layout from "../layout/Layout";
import useQuiosco from "../hooks/useQuiosco";
import { formatearCantidad } from "../helpers";
export default function Total() {
  const { pedido, setNombre, nombre, colocarOrden, total } = useQuiosco();

  const consultarPedido = useCallback(() => {
    return pedido.length === 0 || nombre.length === 0 || nombre.length < 3;
  }, [pedido, nombre]);

  useEffect(() => {
    consultarPedido();
  }, [pedido, consultarPedido]);

  return (
    <Layout pagina="Total">
      <h1 className="text-4xl font-black">Total y confirmar tu pedido</h1>
      <p className="text-2xl my-10">Revisa Tu pedido y su Total</p>

      <form onSubmit={colocarOrden}>
        <div>
          <label
            htmlFor="nombre"
            className="block font-bold text-xl text-slate-800 uppercase "
          >
            Nombre
          </label>
          <input
            id="nombre"
            type="text"
            className="bg-gray-200 w-full lg:w-1/3 mt-3 p-2 rounded-md"
            placeholder="Ingrese su nombre aquí"
            value={nombre}
            onChange={e => setNombre(e.target.value)}
          />
        </div>
        <div className="mt-10">
          <p className="text-2xl">
            Total a pagar{" "}
            <span className="font-bold">{formatearCantidad(total)}</span>
          </p>
        </div>

        <div className="mt-5">
          <input
            className={`${
              consultarPedido()
                ? "bg-indigo-200"
                : "bg-indigo-600 hover:bg-indigo-700"
            } w-full lg:w-auto px-5 py-2 rounded text-center uppercase font-bold  text-white`}
            value="Confirmar pedido"
            type="submit"
            disabled={consultarPedido()}
          />
        </div>
      </form>
    </Layout>
  );
}
