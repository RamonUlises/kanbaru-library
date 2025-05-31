export const prerender = false;
import { getPool } from "@lib/database";
import type { APIRoute } from "astro";

export const GET: APIRoute = async () => {
  try {
    const pool = await getPool();
    const result = await pool.query(`
      SELECT 
        devolucion,
        COUNT(*) AS cantidad
      FROM prestamos
      GROUP BY devolucion
    `)
  
    // Mapear los valores del bit a etiquetas legibles
    const labels: string[] = []
    const data: number[] = []
  
    result.recordset.forEach(row => {
      if (row.devolucion === true || row.devolucion === 1) {
        labels.push("Devueltos")
      } else {
        labels.push("Pendientes")
      }
      data.push(row.cantidad)
    })

    return new Response(
      JSON.stringify({
        labels,
        data,
      }),
      { status: 200 },
    );
  } catch {
    return new Response(JSON.stringify([]), { status: 500 });
  }
};