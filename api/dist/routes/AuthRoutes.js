"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Definicao das Rotas de Autenticacao 
const express_1 = require("express");
const AuthController_1 = require("../controllers/AuthController");
const router = (0, express_1.Router)();
const authController = new AuthController_1.AuthController();
router.post("/login", (req, res) => authController.login(req, res));
exports.default = router;
