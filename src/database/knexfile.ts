import path from "path";
import dotenv from "dotenv";
dotenv.config();

console.log(process.env.DATABASE + " aqui")

let connection = {
  client: "mysql",
  connection: {
    host: process.env.HOST ,
    user: process.env.USER,
    password:process.env.PASSWORD,
    database: process.env.DATABASE ,
    charset: "utf8", 
  },
  migrations: {
    directory: "./migrations",
    tableName: "migrations",
  },
   timezone: 'UTC'
};
export default connection;
