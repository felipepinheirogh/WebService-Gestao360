// api/dist/services/AuthServices.js
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
// Regras de negocio para Autenticacao 
class AuthService {
    authenticate(username, password) {
        // TODO: substituir por validação no banco (Supabase)
        if (username === "admin" && password === "123456") {
            return "fake-jwt-token";
        }
        return null;
    }
}
exports.AuthService = AuthService;
