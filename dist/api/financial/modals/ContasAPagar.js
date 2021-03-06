"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var Modal_1 = __importDefault(require("../../../database/Modal"));
var ValoresContasAPagar_1 = __importDefault(require("./ValoresContasAPagar"));
var ContasPagas_1 = __importDefault(require("./ContasPagas"));
var ContasAPagar = /** @class */ (function (_super) {
    __extends(ContasAPagar, _super);
    function ContasAPagar() {
        var _this = _super.call(this) || this;
        if (!(_this instanceof ContasAPagar))
            return new ContasAPagar();
        return _this;
    }
    ContasAPagar.prototype.getContasWithIdCategoria = function (id, params) {
        return __awaiter(this, void 0, void 0, function () {
            var Valores, Pagas, anoMesSelecionado;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        Valores = new ValoresContasAPagar_1.default();
                        Pagas = new ContasPagas_1.default();
                        anoMesSelecionado = params.dataselecionada.substring(0, 7);
                        return [4 /*yield*/, this.knex("contas_a_pagars")
                                .where("categorias_contas_a_pagar_id", id)
                                .where("user_id", params.userId)
                                .whereRaw("SUBSTRING(inicio_data_pagamento,1,7) <= \"" + anoMesSelecionado + "\"")
                                .whereRaw("SUBSTRING(fim_data_pagamento,1,7) >= \"" + anoMesSelecionado + "\"")
                                .orWhere("categorias_contas_a_pagar_id", id)
                                .where("user_id", params.userId)
                                .whereRaw("SUBSTRING(inicio_data_pagamento,1,7) <= \"" + anoMesSelecionado + "\"")
                                .whereNull("fim_data_pagamento")
                                .orWhere("categorias_contas_a_pagar_id", id)
                                .where("user_id", params.userId)
                                .whereRaw("SUBSTRING(inicio_data_pagamento,1,7) <= \"" + anoMesSelecionado + "\"")
                                .andWhere("fim_data_pagamento", "=", "")
                                .then(function (contas) {
                                var Contas = contas.map(function (conta) { return __awaiter(_this, void 0, void 0, function () {
                                    var _a, _b;
                                    return __generator(this, function (_c) {
                                        switch (_c.label) {
                                            case 0:
                                                _a = conta;
                                                return [4 /*yield*/, Valores.getValoresContasAPagar(conta.id, params)];
                                            case 1:
                                                _a.valores_contas_a_pagars = _c.sent();
                                                _b = conta;
                                                return [4 /*yield*/, Pagas.getContasPagas(conta.id, params)];
                                            case 2:
                                                _b.contas_pagas = _c.sent();
                                                return [2 /*return*/, conta];
                                        }
                                    });
                                }); });
                                var data = Promise.all(Contas);
                                return data;
                            })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ContasAPagar.prototype.getContasWithIdAndDataSelecionada = function (id, params) {
        return __awaiter(this, void 0, void 0, function () {
            var anoMesSelecionado, Valores;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        anoMesSelecionado = params.dataselecionada.substring(0, 7);
                        Valores = new ValoresContasAPagar_1.default();
                        return [4 /*yield*/, this.knex("contas_a_pagars")
                                .where("id", id)
                                .whereRaw("SUBSTRING(inicio_data_pagamento,1,7) <= \"" + anoMesSelecionado + "\"")
                                .whereRaw("SUBSTRING(fim_data_pagamento,1,7) >= \"" + anoMesSelecionado + "\"")
                                .orWhere("id", id)
                                .whereRaw("SUBSTRING(inicio_data_pagamento,1,7) <= \"" + anoMesSelecionado + "\"")
                                .whereNull("fim_data_pagamento")
                                .orWhere("id", id)
                                .whereRaw("SUBSTRING(inicio_data_pagamento,1,7) <= \"" + anoMesSelecionado + "\"")
                                .andWhere("fim_data_pagamento", "=", "")
                                .then(function (contas) {
                                var Contas = contas.map(function (conta) { return __awaiter(_this, void 0, void 0, function () {
                                    var _a;
                                    return __generator(this, function (_b) {
                                        switch (_b.label) {
                                            case 0:
                                                _a = conta;
                                                return [4 /*yield*/, Valores.getValoresContasAPagar(conta.id, params)];
                                            case 1:
                                                _a.valores_contas_a_pagars = _b.sent();
                                                return [2 /*return*/, conta];
                                        }
                                    });
                                }); });
                                var data = Promise.all(Contas);
                                return data;
                            })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ContasAPagar.prototype.storeContasAPagar = function (body) {
        return __awaiter(this, void 0, void 0, function () {
            var dataInsert, newInsert, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        dataInsert = {};
                        body.userId ? (dataInsert.user_id = body.userId) : "";
                        body.favorecido ? (dataInsert.favorecido = body.favorecido) : "";
                        body.categorias_contas_a_pagar_id ? (dataInsert.categorias_contas_a_pagar_id = body.categorias_contas_a_pagar_id) : "";
                        body.inicio_data_pagamento ? (dataInsert.inicio_data_pagamento = body.inicio_data_pagamento) : "";
                        body.fim_data_pagamento ? (dataInsert.fim_data_pagamento = body.fim_data_pagamento) : "";
                        body.descricao ? (dataInsert.descricao = body.descricao) : "";
                        body.forma_pagamento ? (dataInsert.forma_pagamento = body.forma_pagamento) : "";
                        body.tipo_conta ? (dataInsert.tipo_conta = body.tipo_conta) : "";
                        body.parcelas ? (dataInsert.parcelas = body.parcelas) : "";
                        return [4 /*yield*/, this.knex("contas_a_pagars").insert(dataInsert).then(function (res) {
                                return res;
                            }).catch(function (err) {
                                console.log(err);
                            })];
                    case 1:
                        newInsert = _a.sent();
                        data = Promise.all(newInsert).then(function (res) {
                            return res;
                        }).catch(function (err) {
                            console.log(err);
                        });
                        return [2 /*return*/, data];
                }
            });
        });
    };
    ContasAPagar.prototype.updateContasAPagar = function (id, body) {
        return __awaiter(this, void 0, void 0, function () {
            var dataUpdate;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        dataUpdate = {};
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
                        return [4 /*yield*/, this.knex("contas_a_pagars")
                                .where({ id: id })
                                .update(dataUpdate)
                                .then(function (result) {
                                console.log(result);
                                return result;
                            })
                                .catch(function (erro) {
                                console.log(Error(erro));
                                return erro;
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return ContasAPagar;
}(Modal_1.default));
exports.default = ContasAPagar;
//# sourceMappingURL=ContasAPagar.js.map