
import { Request, Response } from "express";

import {IMsgs, authPtBr} from "../lang/authPtBr"
import TokenHelpers from "../../../helpers/TokenHelpers"
import UsersModal from "../../users/modals/Users";

interface IInjection {
  tokenHelpers?: any, usersModal?: any, msgs?: any 
}

class Auth{
  token: TokenHelpers;
  users: UsersModal;
  msgs: IMsgs;
  req: any;
  res: any;
 



  constructor(req: Request, res: Response, injection:IInjection){
    injection.tokenHelpers ? this.token = injection.tokenHelpers : this.token = new TokenHelpers();
    injection.usersModal ? this.users = new injection.usersModal() : this.users = new UsersModal();

    injection.msgs ? this.msgs = injection.msgs :  this.msgs = authPtBr;
        this.req = req;
        this.res = res;
        
  }
    async verifyUser(){
      const userId:Number = await this.users.getUserId(
      this.req.body
    );
    if(userId){
      return userId
    }
    }
    async login() {
    if(!this.req.body.email || !this.req.body.password){  
      return this.res.status(401).send({erro: this.msgs.erro.empty})
    }else{
      const userId = await this.verifyUser()    
      if (userId > 0) {
        const userToken = this.token.generateToken(userId)
        return this.res.json({ auth: true, token: userToken})
      }else{ 
        return  this.res.status(401).send({erro: this.msgs.erro.invalid});
      }  
    }    
  }
    async logout(req: Request, res: Response) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Methods", "GET");
    res.json({ auth: false, token: null });
  }
  async verify(req: Request, res: Response) {
    res.json('Auth okaiiu ' + req.body.userId);
  }
  }
  export default Auth