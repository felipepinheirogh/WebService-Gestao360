"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Registro central e aplicacao dos sub-modulos de rotas 
const express_1 = require("express");
const AuthRoutes_1 = __importDefault(require("./routes/AuthRoutes"));
const router = (0, express_1.Router)();
router.use("/auth", AuthRoutes_1.default);
exports.default = router;
