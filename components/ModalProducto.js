import { useState, useEffect } from "react";
import Image from "next/image";
import { formatearCantidad } from "../helpers";
import useQuiosco from "../hooks/useQuiosco";
const ModalProducto = () => {
  const [cantidad, setCantidad] = useState(1);
  const [editarCantidad, setEditarCantidad] = useState(false);
  const { producto, handleModal, handleAgregarPedido, pedido } = useQuiosco();

  //Comprobar si el modal actual esta en el pedido
  useEffect(() => {
    if (pedido.some(pedidoState => pedidoState.id === producto.id)) {
      const productoEdicion = pedido.find(
        productoState => productoState.id === producto.id
      );
      setEditarCantidad(true);
      setCantidad(productoEdicion.cantidad);
    }
  }, [producto, pedido]);
  return (
    <div className="md:flex gap-10">
      <div className="md:w1/3">
        <Image
          width={300}
          height={400}
          alt={`Imagen Producto ${producto.nombre}`}
          src={`/assets/img/${producto.imagen}.jpg`}
        />
      </div>
      <div className="md:w-2/3">
        <div className="flex justify-end">
          <button onClick={handleModal}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <h1 className="text-3xl font-bold mt-5">{producto.nombre}</h1>
        <p className="mt-5 font-black  text-5xl text-amber-500">
          {formatearCantidad(producto.precio)}
        </p>
        <div className="flex gap-4 mt-5">
          <button
            type="button"
            onClick={() => {
              if (cantidad <= 1) return;
              setCantidad(cantidad - 1);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>
          <p className="text-3xl">{cantidad}</p>
          <button
            type="button"
            onClick={() => {
              setCantidad(cantidad + 1);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>
        </div>
        <button
          type="button"
          className="px-5 py-2 bg-indigo-600 hover:bg-indigo-800 uppercase text-white font-bold mt-5 rounded"
          onClick={() => handleAgregarPedido({ ...producto, cantidad })}
        >
          {editarCantidad ? "Guardar Cambios" : "Agregar Pedido"}
        </button>
      </div>
    </div>
  );
};

export default ModalProducto;
