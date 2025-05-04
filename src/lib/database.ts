import connection from "mssql";

const user = import.meta.env.USER;
const password = import.meta.env.PASSWORD;
const server = 'localhost';
const database = 'kanbaru-library';

const config = {
  user,
  password,
  server,
  database,
  options: {
    trustServerCertificate: true,
  }
}

const sql = connection.connect(config);

export default sql;