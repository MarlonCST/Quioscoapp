import { useRouter } from "next/router";

const Paso = [
  { paso: 1, nombre: "Menú", url: "/" },
  { paso: 2, nombre: "Resumen", url: "/resumen" },
  { paso: 3, nombre: "Total", url: "/total" },
];

const Pasos = () => {
  //Funcion para calcular la barra del porcentaje
  const calcularPorcentaje = () => {
    let valor;
    if (router.pathname === "/") {
      valor = 2;
    } else if (router.pathname === "/resumen") {
      valor = 50;
    } else {
      valor = 100;
    }
    return valor;
  };

  const router = useRouter();
  return (
    <>
      <div className="flex justify-between mb-5">
        {Paso.map(paso => (
          <button
            onClick={() => {
              router.push(paso.url);
            }}
            key={paso.paso}
            className="text-2xl font-bold"
          >
            {paso.nombre}
          </button>
        ))}
      </div>

      <div className="bg-gray-100 mb-10">
        <div
          className="rounded-full bg-amber-500 text-xs leading-none h-2 text-center text-white w-1"
          style={{ width: `${calcularPorcentaje()}%` }}
        ></div>
      </div>
    </>
  );
};

export default Pasos;
