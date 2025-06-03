import { type LibrosTypes } from "@/types/libros";

interface Props {
  libro: LibrosTypes;
}

export default function CardLibros({ libro }: Props) {
  return (
    <section className="card-libros bg-principal-200 dark:bg-zinc-800 mx-4 md:mx-0">
      <div className="card-libros__img">
        <p className="categoria bg-yellow-500 dark:bg-zinc-600 text-sm">
          {libro.categoria}
        </p>
      </div>

      <h2 className="mt-6">{libro.titulo}</h2>

      <div className="datos-libro">
        <p>
          Lenguaje disponible: <br /> <cite>{libro.lenguaje}</cite>
        </p>

        <p>
          Autor/es: <br /> <cite>{libro.autor}</cite>
        </p>

        <p>
          Editorial: <br /> <cite>{libro.editorial}</cite>
        </p>

        <p>
          Ejemplares: <br /> <cite>{libro.ejemplares}</cite>
        </p>
      </div>
    </section>
  );
}
