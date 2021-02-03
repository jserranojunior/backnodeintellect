
import Users from "./controllers/UsersController";
import RouterClass from '../../routes/RouterClass'
export default class UsersRoutes extends RouterClass{
    constructor(){
      super();
    }
    routes(){
     return [
        this.app.post("/users/id", Users.getUserId),
          this.app.post("/users", Users.store),
        ]
      }
}





