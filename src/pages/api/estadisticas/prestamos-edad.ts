import type { APIRoute } from "astro";
import { getPool } from "@lib/database";

export const GET: APIRoute = async () => {
  try {
    const pool = await getPool();
    const resultado = await pool.query(`
  SELECT grupo_edad AS grupo,
         COUNT(*) * 1.0 / COUNT(DISTINCT mes) AS promedio
  FROM (
    SELECT
      p.id_prestamo,
      CONVERT(varchar(6), p.fecha_prestamo, 112) AS mes,
      CASE
        WHEN DATEDIFF(YEAR, u.fecha_nacimiento, GETDATE()) BETWEEN 0 AND 12 THEN '0-12'
        WHEN DATEDIFF(YEAR, u.fecha_nacimiento, GETDATE()) BETWEEN 13 AND 18 THEN '13-18'
        WHEN DATEDIFF(YEAR, u.fecha_nacimiento, GETDATE()) BETWEEN 19 AND 30 THEN '19-30'
        WHEN DATEDIFF(YEAR, u.fecha_nacimiento, GETDATE()) BETWEEN 31 AND 50 THEN '31-50'
        ELSE '51+'
      END AS grupo_edad
    FROM prestamos p
    INNER JOIN usuarios u ON p.id_usuario = u.id_usuario
    WHERE p.fecha_prestamo IS NOT NULL AND u.fecha_nacimiento IS NOT NULL
  ) AS sub
  GROUP BY grupo_edad
  ORDER BY grupo_edad;
`);

    return new Response(JSON.stringify(resultado.recordset), { status: 200 });

  } catch (err: any) {
  console.error("❌ ERROR SQL:", err.message || err);
  return new Response(
    JSON.stringify({ error: err.message || "Error al obtener datos" }),
    { status: 500 }
  );
}
};