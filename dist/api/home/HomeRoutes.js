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
var RouterClass_1 = __importDefault(require("../../routes/RouterClass"));
var HomeRoutes = /** @class */ (function (_super) {
    __extends(HomeRoutes, _super);
    function HomeRoutes() {
        var _this = _super.call(this) || this;
        _this.routes();
        _this.books = [
            { id: 101, name: "Clube da koa", author: "Chuck Paanine" },
            { id: 102, name: "Ta isso ai", author: "Gillian Flynn" },
            { id: 103, name: "Frankenstein", author: "Mary Shelley" },
            { id: 101, name: "Into The Wild", author: "John Krakauer" },
        ];
        return _this;
    }
    HomeRoutes.prototype.routes = function () {
        var _this = this;
        return this.app.get("/", function (req, res) {
            res.send("It's a live =  " + _this.books);
        });
    };
    return HomeRoutes;
}(RouterClass_1.default));
exports.default = HomeRoutes;
//# sourceMappingURL=HomeRoutes.js.map