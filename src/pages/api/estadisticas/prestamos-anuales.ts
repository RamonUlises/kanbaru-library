import type { APIRoute } from "astro";
import { getPool } from "@lib/database";

export const GET: APIRoute = async () => {
  try {
    const pool = await getPool();

    const resultado = await pool.query(`
      WITH Meses (numero, nombre) AS (
        SELECT 1, 'Enero' UNION ALL
        SELECT 2, 'Febrero' UNION ALL
        SELECT 3, 'Marzo' UNION ALL
        SELECT 4, 'Abril' UNION ALL
        SELECT 5, 'Mayo' UNION ALL
        SELECT 6, 'Junio' UNION ALL
        SELECT 7, 'Julio' UNION ALL
        SELECT 8, 'Agosto' UNION ALL
        SELECT 9, 'Septiembre' UNION ALL
        SELECT 10, 'Octubre' UNION ALL
        SELECT 11, 'Noviembre' UNION ALL
        SELECT 12, 'Diciembre'
      )
      SELECT 
        m.numero AS numero_mes,
        m.nombre AS mes,
        YEAR(p.fecha_prestamo) AS anio,
        COUNT(p.id_prestamo) AS total
      FROM Meses m
      LEFT JOIN prestamos p 
        ON MONTH(p.fecha_prestamo) = m.numero
        AND p.fecha_prestamo IS NOT NULL
      GROUP BY m.numero, m.nombre, YEAR(p.fecha_prestamo)
      ORDER BY anio, m.numero;
    `);

    return new Response(JSON.stringify(resultado.recordset), { status: 200 });

  } catch (err: any) {
    console.error("Error en prestamos-anuales:", err.message);
    return new Response(JSON.stringify({ error: "Error al obtener los datos" }), { status: 500 });
  }
};