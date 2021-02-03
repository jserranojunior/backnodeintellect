"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var Token = /** @class */ (function () {
    function Token() {
    }
    Token.prototype.generateToken = function (userId) {
        var token = jsonwebtoken_1.default.sign({ id: userId }, "secret", {
            expiresIn: '365d',
        });
        return token;
    };
    return Token;
}());
exports.default = Token;
//# sourceMappingURL=TokenHelpers.js.map