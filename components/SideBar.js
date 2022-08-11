import Categoria from './Categoria'
import Image from 'next/image'
import useQuiosco from '../hooks/useQuiosco'
const SideBar = () => {

    const { categorias } = useQuiosco()
    return (
        <>
            <Image width={300} height={100} src="/assets/img/logo.svg" alt='Imagen logo' />
            <nav className='mt-10'>
                {categorias.map(categoria => (
                    <Categoria key={categoria.id} categoria={categoria} />
                ))}
            </nav>
        </>
    )
}

export default SideBar