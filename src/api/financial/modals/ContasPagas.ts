import Modal from "../../../database/Modal";
interface IBody {
  contas_a_pagar_id: number;
  data_pagamento: string;
}
class ContasPagas extends Modal {
  async getContasPagas(id, params) {
    const anoMesSelecionado = params.dataselecionada.substring(0, 7);

    let queryRaw = `SUBSTRING(data_pagamento,1,7) = "${anoMesSelecionado}"`;

    let Pagas = await this.knex("contas_pagas")
      .whereRaw(queryRaw)
      .andWhere("contas_a_pagar_id", id)
      // .orderBy("id", "asc")
      .first()
      .then(function (result) {
        return result;
      });

    return Pagas;
  }

  async store(body: object) {
    const newInsert = await this.knex("contas_pagas").insert(body);
    let data = Promise.all(newInsert);
    return data;
  }

  async delete(body: object) {
    const lastDelete = await this.knex("contas_pagas")
      .where(body)
      .first()
      .del();
    let data = lastDelete;
    return data;
  }
}

export default ContasPagas;
