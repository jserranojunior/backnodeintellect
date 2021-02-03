
import FinancialController from "./controllers/FinancialController";
import RouterClass from '../../routes/RouterClass'
import {Request, Response} from "express"

export default class FinancialRoutes extends RouterClass{
    constructor(){
      super();
    }
    routes(){
  
     return [
       this.app.get("/financial/:dataselecionada", this.middlewares.auth, (req,res) => {
                    const financial = new FinancialController(req,res,{})
          financial.get(req,res)}),

                 this.app.post("/financial/billstopay", this.middlewares.auth, (req,res) => {
                    const financial = new FinancialController(req,res,{})
          financial.store(req,res)}),

             this.app.post("/financial/contapaga",  (req,res) => {
                    const financial = new FinancialController(req,res,{})
          financial.storeContasPagas(req,res)}),

            this.app.delete("/financial/contapaga/:contas_a_pagar_id/:data_pagamento",  (req,res) => {
                    const financial = new FinancialController(req,res,{})
          financial.deleteContasPagas(req,res)}),

   this.app.get("/financial/billstopay/:id/:dataselecionada",  (req,res) => {
                    const financial = new FinancialController(req,res,{})
          financial.edit(req,res)}),

             this.app.put("/financial/billstopay/:id/:dataselecionada", this.middlewares.auth, (req,res) => {
                    const financial = new FinancialController(req,res,{})
          financial.update(req,res)}),

      
        // this.app.get("/financial/billstopay/:id/:dataselecionada", financial.edit),
        // this.app.put("/financial/billstopay/:id/:dataselecionada", this.middlewares.auth, financial.update),
        ]
      }
}





