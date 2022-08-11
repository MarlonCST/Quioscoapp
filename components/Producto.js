import Image from "next/image"
import { formatearCantidad } from '../helpers'
import useQuiosco from "../hooks/useQuiosco"
const Producto = ({ producto }) => {
    const { handelProductos, handleModal } = useQuiosco()
    const { id, nombre, precio, imagen } = producto
    return (
        <div className="border mt-10">
            <Image
                width={400}
                height={500}
                src={`/assets/img/${imagen}.jpg`}
                alt={`Imagen producto ${nombre}`}
            />
            <div className="p-5">
                <h3 className="text-2xl font-bold">{nombre}</h3>
                <p className=" mt-5 font-black text-4xl text-amber-500">{formatearCantidad(precio)}</p>
                <button
                    className="p-3 w-full rounded-md mt-5 bg-indigo-600 hover:bg-indigo-700 uppercase text-white font-bold"
                    onClick={() => {
                        handleModal()
                        handelProductos(producto)
                    }}
                >Seleccionar</button>
            </div>
        </div>
    )
}

export default Producto