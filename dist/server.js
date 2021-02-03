"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var routes_1 = __importDefault(require("./routes/routes"));
// import path from "path";
var body_parser_1 = __importDefault(require("body-parser"));
var cors_1 = __importDefault(require("cors"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: __dirname + '/.env' });
console.log(process.env.DATABASE + " banco de dados");
var app = express_1.default();
app.use(cors_1.default());
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
app.use(routes_1.default);
var port;
process.env.PORT ? (port = process.env.PORT) : (port = "8081");
app.listen(port);
console.log(process.env.DOMAIN + port);
//# sourceMappingURL=server.js.map