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
var ValoresContasAPagar = /** @class */ (function (_super) {
    __extends(ValoresContasAPagar, _super);
    function ValoresContasAPagar() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ValoresContasAPagar.prototype.getValoresContasAPagar = function (id, params) {
        return __awaiter(this, void 0, void 0, function () {
            var ValoresContasAPagar, anoMesSelecionado, queryRaw, value, queryRaw_1, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        ValoresContasAPagar = {};
                        anoMesSelecionado = params.dataselecionada.substring(0, 7);
                        queryRaw = "SUBSTRING(data_pagamento,1,7) = \"" + anoMesSelecionado + "\"";
                        return [4 /*yield*/, this.selectValores(id, queryRaw)];
                    case 1:
                        value = _a.sent();
                        if (!value) return [3 /*break*/, 2];
                        ValoresContasAPagar = value;
                        return [3 /*break*/, 4];
                    case 2:
                        queryRaw_1 = "SUBSTRING(data_pagamento,1,7) < \"" + anoMesSelecionado + "\"";
                        return [4 /*yield*/, this.selectValores(id, queryRaw_1)];
                    case 3:
                        ValoresContasAPagar = _a.sent();
                        _a.label = 4;
                    case 4:
                        data = ValoresContasAPagar;
                        return [2 /*return*/, data];
                }
            });
        });
    };
    ValoresContasAPagar.prototype.updateValoresContasAPagar = function (id, body) {
        return __awaiter(this, void 0, void 0, function () {
            var dataUpdate, anoMesSelecionado;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        dataUpdate = {};
                        dataUpdate.data_pagamento = body.data_pagamento;
                        dataUpdate.contas_a_pagar_id = id;
                        body.valor ? (dataUpdate.valor = body.valor) : 0;
                        anoMesSelecionado = dataUpdate.data_pagamento.substring(0, 7);
                        return [4 /*yield*/, this.knex("valores_contas_a_pagars")
                                .where({ contas_a_pagar_id: id })
                                .whereRaw("SUBSTRING(data_pagamento,1,7) = \"" + anoMesSelecionado + "\"")
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
    ValoresContasAPagar.prototype.getCountIdValorContaAPagarWithIdContas = function (contas_a_pagar_id, data_pagamento) {
        return __awaiter(this, void 0, void 0, function () {
            var Valor;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.knex("valores_contas_a_pagars")
                            .where("contas_a_pagar_id", contas_a_pagar_id)
                            .where("data_pagamento", data_pagamento)
                            .count("id as total")
                            .then(function (result) {
                            return result[0].total;
                        })
                            .catch(function (erro) {
                            return erro;
                        })];
                    case 1:
                        Valor = _a.sent();
                        return [2 /*return*/, Valor];
                }
            });
        });
    };
    ValoresContasAPagar.prototype.storeValoresContasAPagar = function (contas_a_pagars_id, body) {
        return __awaiter(this, void 0, void 0, function () {
            var dataInsert, newInsert, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        dataInsert = {};
                        dataInsert.contas_a_pagar_id = contas_a_pagars_id;
                        dataInsert.data_pagamento = body.data_pagamento;
                        dataInsert.valor = body.valor;
                        return [4 /*yield*/, this.knex("valores_contas_a_pagars").insert(dataInsert)];
                    case 1:
                        newInsert = _a.sent();
                        data = Promise.all(newInsert);
                        return [2 /*return*/, data];
                }
            });
        });
    };
    ValoresContasAPagar.prototype.selectValores = function (id, query) {
        return __awaiter(this, void 0, void 0, function () {
            var Valores;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.knex("valores_contas_a_pagars")
                            .whereRaw(query)
                            .andWhere("contas_a_pagar_id", id)
                            .orderBy("id", "desc")
                            .first()
                            .then(function (result) {
                            return result;
                        })];
                    case 1:
                        Valores = _a.sent();
                        return [2 /*return*/, Valores];
                }
            });
        });
    };
    return ValoresContasAPagar;
}(Modal_1.default));
exports.default = ValoresContasAPagar;
//# sourceMappingURL=ValoresContasAPagar.js.map