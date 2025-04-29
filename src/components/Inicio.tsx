import Image1 from "../assets/inicio1.png?url";
export function Inicio() {
  return (
    <section className=" flex flex-col  ">
      <div className="h-[100vh] flex flex-col justify-center items-center">
        <img
          src={Image1}
          alt="imagen inicio"
          className="rounded-3xl object-cover mx-auto shadow-2xl w-[900px] h-[300px] "
        />
        <h2 className="text-6xl font-bold text-center mt-20">
          Organiza el conocimiento,
          <br /> transforma la gestión
        </h2>
        <p className=" text-center font-light text-3xl">
          Una biblioteca eficiente comienza con una <br /> administración
          inteligente.
        </p>
        <button className="bg-principal-500 text-white py-2 px-4 rounded-[10px] mx-auto mt-6">
          Explorar libros
        </button>
      </div>
    </section>
  );
}
