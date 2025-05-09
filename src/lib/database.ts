import sql from 'mssql';

// Database connection configuration
const config = {
  user: import.meta.env.USER_DB,
  password: import.meta.env.PASSWORD_DB,
  server: 'localhost',
  port: 1433,
  database: 'proyecto_seab',
  options: {
    encrypt: true,
    trustServerCertificate: true
  }
};

let pool: sql.ConnectionPool | null = null;

export async function getPool(): Promise<sql.ConnectionPool> {
  if (!pool) {
    pool = await sql.connect(config);
  }
  return pool;
}