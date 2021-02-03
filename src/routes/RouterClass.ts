import express from "express";
import Midlewares from "./middlewares/Middlewares"
const app = express();

export default class Routes{
  middlewares: any;
  app: any
  constructor(){
    this.middlewares = Midlewares;
    this.app = app
  }
  mount(route:any){
    app.use(route);
  }
}

