import express from "express";
import routes from "./routes/routes";
// import path from "path";
import bodyParser from "body-parser";
import cors from "cors";

import dotenv from "dotenv"; 
dotenv.config({path:__dirname + '/.env'});


console.log(process.env.DATABASE + " banco de dados") 

const app = express();
app.use(cors());


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(routes); 

let port: string;
process.env.PORT ? (port = process.env.PORT) : (port = "8081");
app.listen(port); 
console.log(process.env.DOMAIN + port);
