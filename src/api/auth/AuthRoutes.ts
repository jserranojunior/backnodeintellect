
import Auth from "./controllers/Auth";
import {Request, Response} from "express"


import RouterClass from '../../routes/RouterClass'
export default class AuthRoutes extends RouterClass{
    constructor(){
      super();
    
    }
    routes(){
      
     return [
        this.app.post("/login", (req:Request, res: Response) => {
          const auth = new Auth(req,res,{})
          auth.login()
        }),
        this.app.get("/logout",  (req,res) => {
                    const auth = new Auth(req,res,{})
          auth.logout(req,res)}),
        this.app.post("/jwt", this.middlewares.auth, (req,res) => {
                    const auth = new Auth(req,res,{})

          auth.verify(req,res)}),
        ]
      }
    
}

    // res.header("Access-Control-Allow-Origin", "*");
    // res.header("Access-Control-Allow-Methods", "POST"); 

