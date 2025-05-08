import connectionLinux, { type ConnectionPool } from "mssql";
import os from "os";

const isWindows = os.platform() === "win32";

const database = "proyecto_seab";

let sql: ConnectionPool;

if (isWindows) {
  const connectionWind = await import("mssql/msnodesqlv8");
  const config = {
    server: import.meta.env.SERVER_DB,
    database,
    driver: "msnodesqlv8",
    options: {
      trustedConnection: true,
    },
  };

  sql = await connectionWind.connect(config);
} else {
  const config = {
    user: import.meta.env.USER_DB,
    password: import.meta.env.PASSWORD_DB,
    server: import.meta.env.SERVER_DB,
    database,
    options: {
      encrypt: true,
      trustServerCertificate: true,
    },
  };

  sql = await connectionLinux.connect(config);
}

export default sql;
