import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from 'next/router'

const QuioscoContext = createContext();
const QuioscoProvider = ({ children }) => {
  const [categorias, setCategorias] = useState([]);
  const [categoriaActual, setCategoriaActual] = useState({});
  const [producto, setProducto] = useState({});
  const [modal, setModal] = useState(false);
  const [pedido, setPedido] = useState([]);
  const [nombre, setNombre] = useState('')
  const [total, setTotal] = useState(0)
  const router = useRouter()

  const consultarCategorias = async () => {
    const { data } = await axios("/api/categoria");
    setCategorias(data);
  };
  useEffect(() => {
    consultarCategorias();
  }, []);
  //Declaramos un useEffect, para mostrarnos un categoria activa al inicio de la pagina
  useEffect(() => {
    setCategoriaActual(categorias[0]);
  }, [categorias]);
  //useEffect que escuche al pedido y haga la suma
  useEffect(() => {
    const totalPedido = pedido.reduce((total, producto) => (producto.precio * producto.cantidad) + total, 0)
    setTotal(totalPedido)
  }, [pedido])

  //Funcion que filtra la categoria en la que estamos y la pone en un state
  const handleClickCategoria = id => {
    const categoria = categorias.filter(cate => cate.id === id);
    setCategoriaActual(categoria[0]);
    router.push('/')
  };
  //funcion para agregar los productos y que aparezcan en el modal
  const handelProductos = producto => {
    setProducto(producto);
  };
  //Funcion para poder abrir el modal

  const handleModal = () => {
    setModal(!modal);
  };

  //Funcion para agregar un pedido
  const handleAgregarPedido = ({ categoriaId, ...producto }) => {
    if (pedido.some(pedidoState => pedidoState.id === producto.id)) {
      //Actualizando el pedido
      const productoActualizado = pedido.map(pedidoState => pedidoState.id === producto.id ? producto : pedidoState);
      setPedido(productoActualizado);
      toast.success("Guardado Correctamente");
    } else {
      setPedido([...pedido, producto]);
      toast.success("Agregado al pedido");
    }
    setModal(false);
  };
  //Funcion para actualizar el producto en la pantalla de resumen
  const handleEditarCantidades = id => {
    const productoActualizar = pedido.filter(producto => producto.id === id)
    setProducto(productoActualizar[0])
    setModal(!modal)
  }

  //Funcion para eliminar el producto del state

  const handleEliminarProducto = id => {
    const productoEliminado = pedido.filter(pedido => pedido.id !== id)
    setPedido(productoEliminado)
  }

  const colocarOrden = async e => {
    e.preventDefault();

    try {
      await axios.post('/api/ordenes', { pedido, nombre, total, fecha: Date.now().toString() })
      //Reiniciando la aplicacion
      setCategoriaActual(categorias[0])
      setPedido([])
      setNombre('')
      setTotal(0)

      toast.success('Pedido agregado correctamente')
      setTimeout(() => {
        router.push('/')
      }, 3000)

    } catch (error) {
      console.log(error);
    }

  };
  return (
    <QuioscoContext.Provider
      value={{
        categorias,
        handleClickCategoria,
        categoriaActual,
        producto,
        handelProductos,
        modal,
        handleModal,
        handleAgregarPedido,
        pedido,
        handleEditarCantidades,
        handleEliminarProducto,
        setNombre,
        nombre,
        colocarOrden,
        total
      }}
    >
      {children}
    </QuioscoContext.Provider>
  );
};

export { QuioscoProvider };

export default QuioscoContext;
