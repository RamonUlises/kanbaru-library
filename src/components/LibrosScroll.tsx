import { useEffect, useState, useRef } from "react";
import CardLibros from "./CardLibros"; // Asegúrate de tener versión .tsx o usar wrapper
import type { LibrosTypes } from "@/types/libros";

export default function LibrosScroll() {
  const [libros, setLibros] = useState<LibrosTypes[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const observerRef = useRef<HTMLDivElement | null>(null);

  const fetchLibros = async () => {
    setLoading(true);
    const res = await fetch(`/api/books/getbooks?page=${page}`);
    const data = await res.json();
    setLibros((prev) => [...prev, ...data]);
    setLoading(false);
  };

  useEffect(() => {
    fetchLibros();
  }, [page]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !loading) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 1 }
    );

    if (observerRef.current) observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [loading]);

  return (
    <section className="flex flex-wrap gap-5 justify-center mt-5 mb-20 md:mt-24">
      {libros.map((libro, idx) => (
        <CardLibros key={idx} libro={libro} />
      ))}
      <div ref={observerRef} className="h-1 w-full" />
      {loading && <p className="text-center w-full">Cargando más libros...</p>}
    </section>
  );
}
