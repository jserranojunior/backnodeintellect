
import { Request, Response, NextFunction, response } from 'express';

import Auth from "../Auth"

const tokenHelpers:any = {}

tokenHelpers.generateToken = (userId:Number) => {
  if(userId == 1){
    return "666"
  }
}

class usersModal{
 getUserId(body:any){
  if(body.email == "jorgeserranojunior@gmail.com" && body.password == "123"){
    return 1
  }else{
    return 0
  }
}
}
function msg(){
  return {erro: "naõ foi"}
}

const injection = {usersModal, tokenHelpers, msg}



const mockResponse = {
  json: function(v){return v},
  status: function(s) {this.statusCode = s; return this;},
  send: function(v){return v},
} as Response

test('Login', async () => {
  const mockRequest = {
    body: {
    email: "jorgeserranojunior@gmail.com", password: "123"
    },
} as Request;

    const auth = new Auth(mockRequest,mockResponse,injection)
    return auth.login().then(data => {
    expect(data).toStrictEqual({ auth: true, token: "666"});
  });
})

test('Password Empty', async () => {
   const mockRequest = {
    body: {
    email: "jorgeserranojunior@gmail.com", password: ""
    },
} as Request;
    const auth = new Auth(mockRequest,mockResponse,injection)
    return auth.login().then(data => {
    expect(data).toStrictEqual({ erro: "Email ou senha vazios!"});
  });
})

test('Email empty', async () => {
   const mockRequest = {
    body: {
    email: "", password: "123"
    },
} as Request;
    const auth = new Auth(mockRequest,mockResponse,injection)
    return auth.login().then(data => {
    expect(data).toStrictEqual({ erro: "Email ou senha vazios!"});
  });
})