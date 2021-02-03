import Modal from "../../../database/Modal";
import bcrypt from "bcryptjs"

class Users extends Modal {
  async getUserId(body) {
    let user = await this.knex("users")
      .where({email: body.email})
      .first()
      .then(function (result) {
        return result; 
      });
      if(user){     
          let compare =  bcrypt.compareSync(body.password, user.password );
        if(compare){          
          return user.id
        }else{
          console.log(compare)
          return {erro: "Login invalido!"}
        }    
    }else{
          return {erro: "Login invalido."}
        }}

      async store(body: object) {
        const newInsert = await this.knex("users").insert(body);
        let data = Promise.all(newInsert);
        return data;
      }

     
}
export default Users;
