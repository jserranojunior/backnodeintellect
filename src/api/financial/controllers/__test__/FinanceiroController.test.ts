
import { Request, Response, NextFunction, response } from 'express';

import FinanceiroController from "../FinanceiroController"


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