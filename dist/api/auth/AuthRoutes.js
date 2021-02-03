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
var Auth_1 = __importDefault(require("./controllers/Auth"));
var RouterClass_1 = __importDefault(require("../../routes/RouterClass"));
var AuthRoutes = /** @class */ (function (_super) {
    __extends(AuthRoutes, _super);
    function AuthRoutes() {
        return _super.call(this) || this;
    }
    AuthRoutes.prototype.routes = function () {
        return [
            this.app.post("/login", function (req, res) {
                var auth = new Auth_1.default(req, res, {});
                auth.login();
            }),
            this.app.get("/logout", function (req, res) {
                var auth = new Auth_1.default(req, res, {});
                auth.logout(req, res);
            }),
            this.app.post("/jwt", this.middlewares.auth, function (req, res) {
                var auth = new Auth_1.default(req, res, {});
                auth.verify(req, res);
            }),
        ];
    };
    return AuthRoutes;
}(RouterClass_1.default));
exports.default = AuthRoutes;
// res.header("Access-Control-Allow-Origin", "*");
// res.header("Access-Control-Allow-Methods", "POST"); 
//# sourceMappingURL=AuthRoutes.js.map