
// import financial from "../api/financial/routes";
// import auth from "../api/auth/routes";

import FinancialRoutes from "../api/financial/FinancialRoutes";
import AuthRoutes from "../api/auth/AuthRoutes";
import HomeRoutes from "../api/home/HomeRoutes";
import UsersRoutes from "../api/users/UsersRoutes";

const users = new UsersRoutes()
const home = new HomeRoutes()
const financial = new FinancialRoutes()
const auth = new AuthRoutes()


let routes = [home.routes(), financial.routes(), auth.routes(), users.routes()]


export default routes



