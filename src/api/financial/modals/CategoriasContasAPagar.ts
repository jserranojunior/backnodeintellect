import Modal from "../../../database/Modal";
import ContasAPagar from "./ContasAPagar";

class CategoriasContasAPagar extends Modal {
  constructor() {
    super();
  }
  async getCategoriasContasValores(params) {
    let Contas = new ContasAPagar();
    return await this.knex("categorias_contas_a_pagars").then((categorias) => {
      let Categorias = categorias.map(async (categoria) => {
        categoria.contas_a_pagars = await Contas.getContasWithIdCategoria(
          categoria.id,
          params
        );
        return categoria;
      });

      let newCategorias = Promise.all(Categorias);
      let CategoriasSomadas = somarValoresCategorias(newCategorias);
      let cat = CategoriasSomadas;

      let data = cat;

      return data;
    });
  }
}

async function somarValoresCategorias(Categorias) {
  let totalCategorias = 0;
  let ArrayCategorias = Array.from(await Categorias);

  let newCategorias = ArrayCategorias.map((categoria: any) => {
    let contas = categoria.contas_a_pagars;

    let totalCategoria = contas.reduce((acumulador, conta) => {
      if (conta.valores_contas_a_pagars) {
        acumulador += +conta.valores_contas_a_pagars.valor;
      }
      return acumulador;
    }, 0);
    categoria.totalCategoria = totalCategoria;
    totalCategorias += +totalCategoria;
    return categoria;
  });
  let data: any = {};
  data.categorias = await Promise.all(newCategorias);
  data.totalCategorias = totalCategorias;
  return data;
}

export default CategoriasContasAPagar;
