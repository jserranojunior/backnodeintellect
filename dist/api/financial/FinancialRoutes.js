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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var FinancialController_1 = __importDefault(require("./controllers/FinancialController"));
var RouterClass_1 = __importDefault(require("../../routes/RouterClass"));
var FinancialRoutes = /** @class */ (function (_super) {
    __extends(FinancialRoutes, _super);
    function FinancialRoutes() {
        return _super.call(this) || this;
    }
    FinancialRoutes.prototype.routes = function () {
        return [
            this.app.get("/financial/:dataselecionada", this.middlewares.auth, function (req, res) {
                var financial = new FinancialController_1.default(req, res, {});
                financial.get(req, res);
            }),
            this.app.post("/financial/billstopay", this.middlewares.auth, function (req, res) {
                var financial = new FinancialController_1.default(req, res, {});
                financial.store(req, res);
            }),
            this.app.post("/financial/contapaga", function (req, res) {
                var financial = new FinancialController_1.default(req, res, {});
                financial.storeContasPagas(req, res);
            }),
            this.app.delete("/financial/contapaga/:contas_a_pagar_id/:data_pagamento", function (req, res) {
                var financial = new FinancialController_1.default(req, res, {});
                financial.deleteContasPagas(req, res);
            }),
            this.app.get("/financial/billstopay/:id/:dataselecionada", function (req, res) {
                var financial = new FinancialController_1.default(req, res, {});
                financial.edit(req, res);
            }),
            this.app.put("/financial/billstopay/:id/:dataselecionada", this.middlewares.auth, function (req, res) {
                var financial = new FinancialController_1.default(req, res, {});
                financial.update(req, res);
            }),
        ];
    };
    return FinancialRoutes;
}(RouterClass_1.default));
exports.default = FinancialRoutes;
//# sourceMappingURL=FinancialRoutes.js.map