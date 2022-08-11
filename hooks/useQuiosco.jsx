import { useContext } from 'react'
import QuioscoContext from '../context/QuioscoProvide'

const useQuiosco = () => {
    return useContext(QuioscoContext)
}


export default useQuiosco