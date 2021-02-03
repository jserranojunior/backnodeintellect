"use strict";
// import financial from "../api/financial/routes";
// import auth from "../api/auth/routes";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var FinancialRoutes_1 = __importDefault(require("../api/financial/FinancialRoutes"));
var AuthRoutes_1 = __importDefault(require("../api/auth/AuthRoutes"));
var HomeRoutes_1 = __importDefault(require("../api/home/HomeRoutes"));
var UsersRoutes_1 = __importDefault(require("../api/users/UsersRoutes"));
var users = new UsersRoutes_1.default();
var home = new HomeRoutes_1.default();
var financial = new FinancialRoutes_1.default();
var auth = new AuthRoutes_1.default();
var routes = [home.routes(), financial.routes(), auth.routes(), users.routes()];
exports.default = routes;
//# sourceMappingURL=routes.js.map