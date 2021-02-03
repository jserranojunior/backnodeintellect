import Modal from "../../../database/Modal";
import ValoresContasAPagar from "./ValoresContasAPagar";
import ContasPagas from "./ContasPagas";
import { any } from "sequelize/types/lib/operators";

class ContasAPagar extends Modal {
  constructor() {
    super();
    if (!(this instanceof ContasAPagar)) return new ContasAPagar();
  }

  async getContasWithIdCategoria(id, params) {  
    let Valores = new ValoresContasAPagar();
    let Pagas = new ContasPagas();
    const anoMesSelecionado = params.dataselecionada.substring(0, 7);

    return await this.knex("contas_a_pagars")
      .where("categorias_contas_a_pagar_id", id)
      .where("user_id", params.userId)
      .whereRaw(
        `SUBSTRING(inicio_data_pagamento,1,7) <= "${anoMesSelecionado}"`
      )
      .whereRaw(`SUBSTRING(fim_data_pagamento,1,7) >= "${anoMesSelecionado}"`)

      .orWhere("categorias_contas_a_pagar_id", id)
            .where("user_id", params.userId)

      .whereRaw(
        `SUBSTRING(inicio_data_pagamento,1,7) <= "${anoMesSelecionado}"`
      )
      .whereNull("fim_data_pagamento")

      .orWhere("categorias_contas_a_pagar_id", id)
            .where("user_id", params.userId)
      .whereRaw(
        `SUBSTRING(inicio_data_pagamento,1,7) <= "${anoMesSelecionado}"`
      )
      .andWhere("fim_data_pagamento", "=", "")

      .then((contas) => {
        let Contas = contas.map(async (conta) => {
          conta.valores_contas_a_pagars = await Valores.getValoresContasAPagar(
            conta.id,
            params
          );

          conta.contas_pagas = await Pagas.getContasPagas(conta.id, params);
          return conta;
        });

        let data = Promise.all(Contas);
        return data;
      });
  }
  async getContasWithIdAndDataSelecionada(id, params) {
    const anoMesSelecionado = params.dataselecionada.substring(0, 7);
    let Valores = new ValoresContasAPagar();
    return await this.knex("contas_a_pagars")
      .where("id", id)
      .whereRaw(
        `SUBSTRING(inicio_data_pagamento,1,7) <= "${anoMesSelecionado}"`
      )
      .whereRaw(`SUBSTRING(fim_data_pagamento,1,7) >= "${anoMesSelecionado}"`)

      .orWhere("id", id)
      .whereRaw(
        `SUBSTRING(inicio_data_pagamento,1,7) <= "${anoMesSelecionado}"`
      )
      .whereNull("fim_data_pagamento")

      .orWhere("id", id)
      .whereRaw(
        `SUBSTRING(inicio_data_pagamento,1,7) <= "${anoMesSelecionado}"`
      )
      .andWhere("fim_data_pagamento", "=", "")

      .then((contas) => {
        let Contas = contas.map(async (conta) => {
          conta.valores_contas_a_pagars = await Valores.getValoresContasAPagar(
            conta.id,
            params
          );
          return conta;
        });

        let data = Promise.all(Contas);
        return data;
      });
  }
  async storeContasAPagar(body) {

        const dataInsert: any = {};

    body.userId ? (dataInsert.user_id = body.userId) : "";
    body.favorecido ? (dataInsert.favorecido = body.favorecido) : "";
    body.categorias_contas_a_pagar_id ? (dataInsert.categorias_contas_a_pagar_id = body.categorias_contas_a_pagar_id) : "";
    body.inicio_data_pagamento ? (dataInsert.inicio_data_pagamento = body.inicio_data_pagamento) : "";
    body.fim_data_pagamento ? (dataInsert.fim_data_pagamento = body.fim_data_pagamento) : "";
    body.descricao ? (dataInsert.descricao = body.descricao) : "";
    body.forma_pagamento ? (dataInsert.forma_pagamento = body.forma_pagamento) : "";
    body.tipo_conta ? (dataInsert.tipo_conta = body.tipo_conta) : "";
    body.parcelas ? (dataInsert.parcelas = body.parcelas) : "";

    const newInsert = await this.knex("contas_a_pagars").insert(dataInsert).then(res => {
      return res
    }).catch(err => {
      console.log(err)
    }); 
    let data = Promise.all(newInsert).then(res =>{
      return res
    }).catch(err => {
      console.log(err)
    });
    return data;
  }
  async updateContasAPagar(id, body) {
    const dataUpdate: any = {};
    body.userId ? (dataUpdate.user_id = body.userId) : "";
    body.favorecido ? (dataUpdate.favorecido = body.favorecido) : "";
    body.categorias_contas_a_pagar_id
      ? (dataUpdate.categorias_contas_a_pagar_id =
          body.categorias_contas_a_pagar_id)
      : "";
    body.inicio_data_pagamento
      ? (dataUpdate.inicio_data_pagamento = body.inicio_data_pagamento)
      : "";
    body.fim_data_pagamento
      ? (dataUpdate.fim_data_pagamento = body.fim_data_pagamento)
      : "";
    body.descricao ? (dataUpdate.descricao = body.descricao) : "";
    body.forma_pagamento
      ? (dataUpdate.forma_pagamento = body.forma_pagamento)
      : "";
    body.tipo_conta ? (dataUpdate.tipo_conta = body.tipo_conta) : "";
    body.parcelas ? (dataUpdate.parcelas = body.parcelas) : "";

    await this.knex("contas_a_pagars")
      .where({ id: id })
      .update(dataUpdate)
      .then((result) => {
        console.log(result);
        return result;
      })
      .catch((erro) => {
        console.log(Error(erro));
        return erro;
      });
  }
}

export default ContasAPagar;
