import Modal from "../../../database/Modal";

class ValoresContasAPagar extends Modal {
  async getValoresContasAPagar(id, params) {
    let ValoresContasAPagar = {};
    const anoMesSelecionado = params.dataselecionada.substring(0, 7);

    let queryRaw = `SUBSTRING(data_pagamento,1,7) = "${anoMesSelecionado}"`;

    let value = await this.selectValores(id, queryRaw);

    if (value) {
      ValoresContasAPagar = value;
    } else {
      let queryRaw = `SUBSTRING(data_pagamento,1,7) < "${anoMesSelecionado}"`;
      ValoresContasAPagar = await this.selectValores(id, queryRaw);
    }

    let data = ValoresContasAPagar;
    return data;
  }

  async updateValoresContasAPagar(id:string, body:any) {
  
      const dataUpdate: any = {};
      dataUpdate.data_pagamento = body.data_pagamento 
      dataUpdate.contas_a_pagar_id = id      
      body.valor ? (dataUpdate.valor = body.valor) : 0;


      const anoMesSelecionado = dataUpdate.data_pagamento.substring(0, 7);

      await this.knex("valores_contas_a_pagars")
        .where({ contas_a_pagar_id: id })
        .whereRaw(`SUBSTRING(data_pagamento,1,7) = "${anoMesSelecionado}"`)
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

  async getCountIdValorContaAPagarWithIdContas(
    contas_a_pagar_id,
    data_pagamento
  ) {
    let Valor = await this.knex("valores_contas_a_pagars")
      .where("contas_a_pagar_id", contas_a_pagar_id)
      .where("data_pagamento", data_pagamento)
      .count("id as total")
      .then(function (result) {
        return result[0].total;
      })
      .catch((erro) => {
        return erro;
      });

    return Valor;
  }

  async storeValoresContasAPagar(contas_a_pagars_id, body) {
    const dataInsert: any = {};

    dataInsert.contas_a_pagar_id = contas_a_pagars_id;
    dataInsert.data_pagamento = body.data_pagamento;
    dataInsert.valor = body.valor;

    const newInsert = await this.knex("valores_contas_a_pagars").insert(
      dataInsert
    );
    let data = Promise.all(newInsert);
    return data;
  }

  async selectValores(id, query) {
    let Valores = await this.knex("valores_contas_a_pagars")
      .whereRaw(query)
      .andWhere("contas_a_pagar_id", id)
      .orderBy("id", "desc")
      .first()
      .then(function (result) {
        return result;
      });

    return Valores;
  }
}

export default ValoresContasAPagar;
