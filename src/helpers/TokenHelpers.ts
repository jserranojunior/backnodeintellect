import jwt from "jsonwebtoken";

export default class Token{
  generateToken(userId:Number){
  const token = jwt.sign({ id:userId }, "secret", {
          expiresIn: '365d',
        });
        return token
}
}