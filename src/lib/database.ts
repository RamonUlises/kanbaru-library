import connection from "mssql";

const user = import.meta.env.USER_DB;
const password = import.meta.env.PASSWORD_DB;
const server = 'localhost';
const database = 'proyecto_seab';

const config = {
  user,
  password,
  server,
  database,
  options: {
    encrypt: true,
    trustServerCertificate: true,
  }
}

const sql = connection.connect(config);

export default sql;
