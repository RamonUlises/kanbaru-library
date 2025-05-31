export const prerender = false;
import { getPool } from "@lib/database";
import type { APIRoute } from "astro";

export const GET: APIRoute = async () => {
  try {
    const pool = await getPool();
    const result = await pool.query(`
      SELECT 
        FORMAT(fecha_prestamo, 'MMMM', 'es-ES') AS mes,
        COUNT(*) AS cantidad,
        MONTH(fecha_prestamo) AS numero_mes
      FROM prestamos
      GROUP BY FORMAT(fecha_prestamo, 'MMMM', 'es-ES'), MONTH(fecha_prestamo)
      ORDER BY numero_mes
    `)

    return new Response(
      JSON.stringify({
        labels: result.recordset.map(row =>
          row.mes.charAt(0).toUpperCase() + row.mes.slice(1, 3)
        ),
        data: result.recordset.map((row) => row.cantidad),
      }),
      { status: 200 },
    );
  } catch {
    return new Response(JSON.stringify([]), { status: 500 });
  }
};