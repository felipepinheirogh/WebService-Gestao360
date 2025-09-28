// api/dist/controllers/AuthController.js
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const AuthService_1 = require("../services/AuthService");
class AuthController {
    constructor() {
        this.service = new AuthService_1.AuthService();
    }
    async login(req, res) {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ error: "Usuário e senha obrigatórios" });
        }
        const token = this.service.authenticate(username, password);
        if (!token) {
            return res.status(401).json({ error: "Credenciais inválidas" });
        }
        return res.json({ token });
    }
}
exports.AuthController = AuthController;
