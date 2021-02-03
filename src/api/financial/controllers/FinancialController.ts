import CategoriasContasAPagar from '../modals/CategoriasContasAPagar'
import Contas from '../modals/ContasAPagar'
import Valores from '../modals/ValoresContasAPagar'
import Pagas from '../modals/ContasPagas'
import { Request, Response } from 'express'
import { promises } from 'fs'

const ContasPagas = new Pagas()
const ContasAPagar = new Contas()
const ValoresContasAPagar = new Valores()
let CategoriasContas = new CategoriasContasAPagar()
interface IBodyType {
  body: { aa: string }
}

class FinancialController {
  CategoriasContas: any
  req: any
  res: Response<any>
  ContasAPagar: Contas
  ValoresContasAPagar: any
  ContasPagas: Pagas

  constructor(req: Request, res: Response, injection: any) {
    injection.CategoriasContas
      ? (this.CategoriasContas = injection.CategoriasContas)
      : (this.CategoriasContas = CategoriasContas)
    injection.ContasAPagar
      ? (this.ContasAPagar = injection.ContasAPagar)
      : (this.ContasAPagar = ContasAPagar)
    injection.ValoresContasAPagar
      ? (this.ValoresContasAPagar = injection.ValoresContasAPagar)
      : (this.ValoresContasAPagar = ValoresContasAPagar)

    injection.ContasPagas
      ? (this.ContasPagas = injection.ContasPagas)
      : (this.ContasPagas = ContasPagas)

    this.req = req
    this.res = res
  }
  async get(req: Request, res: Response) {
        res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET')
    req.params.userId = req.body.userId
    let categorias = await this.CategoriasContas.getCategoriasContasValores(
      req.params
    )
    res.json(categorias)
  }
  formatBody(req) {
    if (req.body.valor) {
      req.body.valor = req.body.valor.replace('.', '').replace(',', '.')
    }

    if (
      req.body.inicio_data_pagamento &&
      req.body.inicio_data_pagamento.includes('/')
    ) {
      req.body.inicio_data_pagamento = req.body.inicio_data_pagamento
        .split('/')
        .reverse()
        .join('-')
    }

    if (req.body.data_pagamento && req.body.data_pagamento.includes('/')) {
      req.body.data_pagamento = req.body.data_pagamento
        .split('/')
        .reverse()
        .join('-')
    }

    if (
      req.body.fim_data_pagamento &&
      req.body.fim_data_pagamento.includes('/')
    ) {
      req.body.fim_data_pagamento = req.body.fim_data_pagamento
        .split('/')
        .reverse()
        .join('-')
    }

    if (req.params.data_pagamento && req.params.data_pagamento.includes('/')) {
      req.params.data_pagamento = req.params.data_pagamento
        .split('/')
        .reverse()
        .join('-')
    }

    return req
  }
  async store(req: Request, res: Response) {
    req = this.formatBody(req)

    if (req.body.inicio_data_pagamento && !req.body.data_pagamento) {
      req.body.data_pagamento = req.body.inicio_data_pagamento
    }

    let idContaInserida = await this.ContasAPagar.storeContasAPagar(req.body)
    let idValorInserido = await this.ValoresContasAPagar.storeValoresContasAPagar(
      idContaInserida,
      req.body
    )

    const insertsContaValor = [idContaInserida, idValorInserido]

    res.json(insertsContaValor)
  }
  async storeContasPagas(req: Request, res: Response) {
    try {
      req = this.formatBody(req)
      let ContaPaga = await this.ContasPagas.store(req.body)
      const insertsContaValor = ContaPaga
      res.json(insertsContaValor)
    } catch (erro) {
      console.log(erro)
      res.status(500).json(erro)
    }
  }
  async deleteContasPagas(req: Request, res: Response) {
    try {
      req = this.formatBody(req)
      let contaDeletada = {}
      let ContaPagaDeletada = await this.ContasPagas.delete(req.params)
      contaDeletada = ContaPagaDeletada
      res.json(contaDeletada)
    } catch (erro) {
      console.log(erro)
      res.status(500).json(erro)
    }
  }

  async edit(req: Request, res: Response) {
    const id = req.params.id
    let contas = await this.ContasAPagar.getContasWithIdAndDataSelecionada(
      id,
      req.params
    )
    res.json(contas)
  }

  async update(req: Request, res: Response) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'PUT')

    req = this.formatBody(req)
    if (req.params.dataselecionada && !req.body.data_pagamento) {
      req.body.data_pagamento = req.params.dataselecionada
    }

    // ATUALIZAR CONTAS
    // VERIFICAR SE O VALOR JA ESTA CADASTRADO
    //  CADASTRAR A CONTA OU O ATUALIZAR O VALOR

    await this.ContasAPagar.updateContasAPagar(req.params.id, req.body)
      .then(() => {})
      .catch((erro) => {
        res.status(500).json(erro)
      })

    await this.ValoresContasAPagar.getCountIdValorContaAPagarWithIdContas(
      req.params.id,
      req.params.dataselecionada
    )
      .then(async (result) => {
        if (result > 0) {
          await this.updateValoresAPagar(req, res)
        } else {
          await this.storeValoresAPagar(req, res)
        }
      })
      .catch((erro) => {
        res.status(500).json(erro)
      })
  }

  async updateValoresAPagar(req, res) {
    await this.ValoresContasAPagar.updateValoresContasAPagar(
      req.params.id,
      req.body
    )
      .then(() => {
        res.json(true)
      })
      .catch((erro) => {
        res.status(500).json(erro)
      })
  }

  async storeValoresAPagar(req, res) {
    await this.ValoresContasAPagar.storeValoresContasAPagar(
      req.params.id,
      req.body
    )
      .then(() => {
        res.json(true)
      })
      .catch((erro) => {
        res.status(500).json(erro)
      })
  }
}
export default FinancialController
