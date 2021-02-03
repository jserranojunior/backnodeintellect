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
var UsersController_1 = __importDefault(require("./controllers/UsersController"));
var RouterClass_1 = __importDefault(require("../../routes/RouterClass"));
var UsersRoutes = /** @class */ (function (_super) {
    __extends(UsersRoutes, _super);
    function UsersRoutes() {
        return _super.call(this) || this;
    }
    UsersRoutes.prototype.routes = function () {
        return [
            this.app.post("/users/id", UsersController_1.default.getUserId),
            this.app.post("/users", UsersController_1.default.store),
        ];
    };
    return UsersRoutes;
}(RouterClass_1.default));
exports.default = UsersRoutes;
//# sourceMappingURL=UsersRoutes.js.map