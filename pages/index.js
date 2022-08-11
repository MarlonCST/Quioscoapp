
import Layout from '../layout/Layout'
import Producto from '../components/Producto'
import useQuiosco from '../hooks/useQuiosco'

export default function Home() {
  const { categoriaActual } = useQuiosco()
  return (
    <Layout pagina={`Menú ${categoriaActual?.nombre}`}>
      <h1 className='text-4xl font-bold'>{categoriaActual?.nombre}</h1>
      <p className='mt-10 text-2xl'>Elige y personaliza tu pedido a continuación</p>
      <div className=' grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4'>

        {categoriaActual?.Productos?.map(producto => (
          <Producto
            key={producto.id}
            producto={producto}
          />
        ))}
      </div>
    </Layout>
  )
}



