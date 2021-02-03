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
var ContasAPagar_1 = __importDefault(require("./ContasAPagar"));
var CategoriasContasAPagar = /** @class */ (function (_super) {
    __extends(CategoriasContasAPagar, _super);
    function CategoriasContasAPagar() {
        return _super.call(this) || this;
    }
    CategoriasContasAPagar.prototype.getCategoriasContasValores = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var Contas;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        Contas = new ContasAPagar_1.default();
                        return [4 /*yield*/, this.knex("categorias_contas_a_pagars").then(function (categorias) {
                                var Categorias = categorias.map(function (categoria) { return __awaiter(_this, void 0, void 0, function () {
                                    var _a;
                                    return __generator(this, function (_b) {
                                        switch (_b.label) {
                                            case 0:
                                                _a = categoria;
                                                return [4 /*yield*/, Contas.getContasWithIdCategoria(categoria.id, params)];
                                            case 1:
                                                _a.contas_a_pagars = _b.sent();
                                                return [2 /*return*/, categoria];
                                        }
                                    });
                                }); });
                                var newCategorias = Promise.all(Categorias);
                                var CategoriasSomadas = somarValoresCategorias(newCategorias);
                                var cat = CategoriasSomadas;
                                var data = cat;
                                return data;
                            })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return CategoriasContasAPagar;
}(Modal_1.default));
function somarValoresCategorias(Categorias) {
    return __awaiter(this, void 0, void 0, function () {
        var totalCategorias, ArrayCategorias, _a, _b, newCategorias, data, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    totalCategorias = 0;
                    _b = (_a = Array).from;
                    return [4 /*yield*/, Categorias];
                case 1:
                    ArrayCategorias = _b.apply(_a, [_d.sent()]);
                    newCategorias = ArrayCategorias.map(function (categoria) {
                        var contas = categoria.contas_a_pagars;
                        var totalCategoria = contas.reduce(function (acumulador, conta) {
                            if (conta.valores_contas_a_pagars) {
                                acumulador += +conta.valores_contas_a_pagars.valor;
                            }
                            return acumulador;
                        }, 0);
                        categoria.totalCategoria = totalCategoria;
                        totalCategorias += +totalCategoria;
                        return categoria;
                    });
                    data = {};
                    _c = data;
                    return [4 /*yield*/, Promise.all(newCategorias)];
                case 2:
                    _c.categorias = _d.sent();
                    data.totalCategorias = totalCategorias;
                    return [2 /*return*/, data];
            }
        });
    });
}
exports.default = CategoriasContasAPagar;
//# sourceMappingURL=CategoriasContasAPagar.js.map