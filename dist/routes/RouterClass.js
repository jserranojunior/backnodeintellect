"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var Middlewares_1 = __importDefault(require("./middlewares/Middlewares"));
var app = express_1.default();
var Routes = /** @class */ (function () {
    function Routes() {
        this.middlewares = Middlewares_1.default;
        this.app = app;
    }
    Routes.prototype.mount = function (route) {
        app.use(route);
    };
    return Routes;
}());
exports.default = Routes;
//# sourceMappingURL=RouterClass.js.map