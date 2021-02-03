export interface IMsgs {
  erro: {empty: string, invalid: string},
  success:{logged: string};
}

export const authPtBr:IMsgs = {
  erro: {
  empty: "Email ou senha vazios!",
   invalid: "Login invalido!" 
},success:{
  logged: "Logado com sucesso"
}
}
