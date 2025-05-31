export const prerender = false;
import { getPool } from "@lib/database";
import type { APIRoute } from "astro";

export const GET: APIRoute = async () => {
  try {
    const pool = await getPool();
    const result = await pool.query(`
      SELECT
        CASE
          WHEN DATEDIFF(YEAR, fecha_nacimiento, GETDATE()) BETWEEN 18 AND 25 THEN '18-25'
          WHEN DATEDIFF(YEAR, fecha_nacimiento, GETDATE()) BETWEEN 26 AND 35 THEN '26-35'
          WHEN DATEDIFF(YEAR, fecha_nacimiento, GETDATE()) BETWEEN 36 AND 45 THEN '36-45'
          WHEN DATEDIFF(YEAR, fecha_nacimiento, GETDATE()) BETWEEN 46 AND 55 THEN '46-55'
          ELSE '56+'
        END AS rango_edad,
        COUNT(*) AS cantidad
      FROM usuarios
      GROUP BY
        CASE
          WHEN DATEDIFF(YEAR, fecha_nacimiento, GETDATE()) BETWEEN 18 AND 25 THEN '18-25'
          WHEN DATEDIFF(YEAR, fecha_nacimiento, GETDATE()) BETWEEN 26 AND 35 THEN '26-35'
          WHEN DATEDIFF(YEAR, fecha_nacimiento, GETDATE()) BETWEEN 36 AND 45 THEN '36-45'
          WHEN DATEDIFF(YEAR, fecha_nacimiento, GETDATE()) BETWEEN 46 AND 55 THEN '46-55'
          ELSE '56+'
        END
    `);

    return new Response(
      JSON.stringify({
        labels: result.recordset.map((row) => row.rango_edad),
        data: result.recordset.map((row) => row.cantidad),
      }),
      { status: 200 },
    );
  } catch {
    return new Response(JSON.stringify([]), { status: 500 });
  }
};