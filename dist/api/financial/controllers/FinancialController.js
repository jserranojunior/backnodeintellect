"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var CategoriasContasAPagar_1 = __importDefault(require("../modals/CategoriasContasAPagar"));
var ContasAPagar_1 = __importDefault(require("../modals/ContasAPagar"));
var ValoresContasAPagar_1 = __importDefault(require("../modals/ValoresContasAPagar"));
var ContasPagas_1 = __importDefault(require("../modals/ContasPagas"));
var ContasPagas = new ContasPagas_1.default();
var ContasAPagar = new ContasAPagar_1.default();
var ValoresContasAPagar = new ValoresContasAPagar_1.default();
var CategoriasContas = new CategoriasContasAPagar_1.default();
var FinancialController = /** @class */ (function () {
    function FinancialController(req, res, injection) {
        injection.CategoriasContas
            ? (this.CategoriasContas = injection.CategoriasContas)
            : (this.CategoriasContas = CategoriasContas);
        injection.ContasAPagar
            ? (this.ContasAPagar = injection.ContasAPagar)
            : (this.ContasAPagar = ContasAPagar);
        injection.ValoresContasAPagar
            ? (this.ValoresContasAPagar = injection.ValoresContasAPagar)
            : (this.ValoresContasAPagar = ValoresContasAPagar);
        injection.ContasPagas
            ? (this.ContasPagas = injection.ContasPagas)
            : (this.ContasPagas = ContasPagas);
        this.req = req;
        this.res = res;
    }
    FinancialController.prototype.get = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var categorias;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        res.header('Access-Control-Allow-Origin', '*');
                        res.header('Access-Control-Allow-Methods', 'GET');
                        req.params.userId = req.body.userId;
                        return [4 /*yield*/, this.CategoriasContas.getCategoriasContasValores(req.params)];
                    case 1:
                        categorias = _a.sent();
                        res.json(categorias);
                        return [2 /*return*/];
                }
            });
        });
    };
    FinancialController.prototype.formatBody = function (req) {
        if (req.body.valor) {
            req.body.valor = req.body.valor.replace('.', '').replace(',', '.');
        }
        if (req.body.inicio_data_pagamento &&
            req.body.inicio_data_pagamento.includes('/')) {
            req.body.inicio_data_pagamento = req.body.inicio_data_pagamento
                .split('/')
                .reverse()
                .join('-');
        }
        if (req.body.data_pagamento && req.body.data_pagamento.includes('/')) {
            req.body.data_pagamento = req.body.data_pagamento
                .split('/')
                .reverse()
                .join('-');
        }
        if (req.body.fim_data_pagamento &&
            req.body.fim_data_pagamento.includes('/')) {
            req.body.fim_data_pagamento = req.body.fim_data_pagamento
                .split('/')
                .reverse()
                .join('-');
        }
        if (req.params.data_pagamento && req.params.data_pagamento.includes('/')) {
            req.params.data_pagamento = req.params.data_pagamento
                .split('/')
                .reverse()
                .join('-');
        }
        return req;
    };
    FinancialController.prototype.store = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var idContaInserida, idValorInserido, insertsContaValor;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        req = this.formatBody(req);
                        if (req.body.inicio_data_pagamento && !req.body.data_pagamento) {
                            req.body.data_pagamento = req.body.inicio_data_pagamento;
                        }
                        return [4 /*yield*/, this.ContasAPagar.storeContasAPagar(req.body)];
                    case 1:
                        idContaInserida = _a.sent();
                        return [4 /*yield*/, this.ValoresContasAPagar.storeValoresContasAPagar(idContaInserida, req.body)];
                    case 2:
                        idValorInserido = _a.sent();
                        insertsContaValor = [idContaInserida, idValorInserido];
                        res.json(insertsContaValor);
                        return [2 /*return*/];
                }
            });
        });
    };
    FinancialController.prototype.storeContasPagas = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var ContaPaga, insertsContaValor, erro_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        req = this.formatBody(req);
                        return [4 /*yield*/, this.ContasPagas.store(req.body)];
                    case 1:
                        ContaPaga = _a.sent();
                        insertsContaValor = ContaPaga;
                        res.json(insertsContaValor);
                        return [3 /*break*/, 3];
                    case 2:
                        erro_1 = _a.sent();
                        console.log(erro_1);
                        res.status(500).json(erro_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    FinancialController.prototype.deleteContasPagas = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var contaDeletada, ContaPagaDeletada, erro_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        req = this.formatBody(req);
                        contaDeletada = {};
                        return [4 /*yield*/, this.ContasPagas.delete(req.params)];
                    case 1:
                        ContaPagaDeletada = _a.sent();
                        contaDeletada = ContaPagaDeletada;
                        res.json(contaDeletada);
                        return [3 /*break*/, 3];
                    case 2:
                        erro_2 = _a.sent();
                        console.log(erro_2);
                        res.status(500).json(erro_2);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    FinancialController.prototype.edit = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, contas;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.params.id;
                        return [4 /*yield*/, this.ContasAPagar.getContasWithIdAndDataSelecionada(id, req.params)];
                    case 1:
                        contas = _a.sent();
                        res.json(contas);
                        return [2 /*return*/];
                }
            });
        });
    };
    FinancialController.prototype.update = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        res.header('Access-Control-Allow-Origin', '*');
                        res.header('Access-Control-Allow-Methods', 'PUT');
                        req = this.formatBody(req);
                        if (req.params.dataselecionada && !req.body.data_pagamento) {
                            req.body.data_pagamento = req.params.dataselecionada;
                        }
                        // ATUALIZAR CONTAS
                        // VERIFICAR SE O VALOR JA ESTA CADASTRADO
                        //  CADASTRAR A CONTA OU O ATUALIZAR O VALOR
                        return [4 /*yield*/, this.ContasAPagar.updateContasAPagar(req.params.id, req.body)
                                .then(function () { })
                                .catch(function (erro) {
                                res.status(500).json(erro);
                            })];
                    case 1:
                        // ATUALIZAR CONTAS
                        // VERIFICAR SE O VALOR JA ESTA CADASTRADO
                        //  CADASTRAR A CONTA OU O ATUALIZAR O VALOR
                        _a.sent();
                        return [4 /*yield*/, this.ValoresContasAPagar.getCountIdValorContaAPagarWithIdContas(req.params.id, req.params.dataselecionada)
                                .then(function (result) { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            if (!(result > 0)) return [3 /*break*/, 2];
                                            return [4 /*yield*/, this.updateValoresAPagar(req, res)];
                                        case 1:
                                            _a.sent();
                                            return [3 /*break*/, 4];
                                        case 2: return [4 /*yield*/, this.storeValoresAPagar(req, res)];
                                        case 3:
                                            _a.sent();
                                            _a.label = 4;
                                        case 4: return [2 /*return*/];
                                    }
                                });
                            }); })
                                .catch(function (erro) {
                                res.status(500).json(erro);
                            })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    FinancialController.prototype.updateValoresAPagar = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.ValoresContasAPagar.updateValoresContasAPagar(req.params.id, req.body)
                            .then(function () {
                            res.json(true);
                        })
                            .catch(function (erro) {
                            res.status(500).json(erro);
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    FinancialController.prototype.storeValoresAPagar = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.ValoresContasAPagar.storeValoresContasAPagar(req.params.id, req.body)
                            .then(function () {
                            res.json(true);
                        })
                            .catch(function (erro) {
                            res.status(500).json(erro);
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return FinancialController;
}());
exports.default = FinancialController;
//# sourceMappingURL=FinancialController.js.map