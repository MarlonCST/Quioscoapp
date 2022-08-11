import Layout from "../layout/Layout";
import ResumenProducto from "../components/ResumenProducto";
import useQuiosco from "../hooks/useQuiosco";
export default function Resumen() {
  const { pedido } = useQuiosco();
  return (
    <Layout pagina="Resumen">
      <h1 className="text-4xl font-black">Resumen</h1>
      <p className="text-2xl my-5 font-black">Revisa tu pedido</p>
      {pedido.length > 0 ? (
        <p className=" text-2xl my-10">
          Si deseas agregar más productos, por favor, regresa al menú
        </p>
      ) : (
        ""
      )}

      {pedido.length === 0
        ? "No hay elementos en tu pedido"
        : pedido.map(producto => (
            <ResumenProducto key={producto.id} producto={producto} />
          ))}
    </Layout>
  );
}
