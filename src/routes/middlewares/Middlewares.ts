import jwt from "jsonwebtoken";
import { Request, Response } from "express";

export default {
  async auth(req: Request, res: Response, next: any) {
    let authHeader:string = req.headers.authorization;
    
    if (!authHeader) {
      return res
        .status(401)
        .json({ auth: false, message: "No token provided" });
    }else {
    const deconstructionAuthHeader = authHeader.split(' ');
    if(deconstructionAuthHeader.length !== 2){
       res.json(deconstructionAuthHeader)
       res.status(401).send({error: 'Token error'})
    }else{
      const [scheme, token] = deconstructionAuthHeader
       if(scheme !== "Bearer"){
        res.status(401).send({error: 'Invalid token format'})
       }
       else{
          jwt.verify(token, "secret", function (err: any, decoded: { id: any }) {
                if (err) {
                  return res
                    .status(500)
                    .json({ auth: false, message: "Token Invalid."});
                }else{
                  req.body.userId = decoded.id
                  next();
                }    
        });
       }
     }
    }
  }


}



