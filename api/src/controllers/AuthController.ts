// Controller de Autenticacao 
import { Request, Response } from "express";
import { AuthService } from "../services/AuthService";

export class AuthController {
  private service: AuthService;

  constructor() {
    this.service = new AuthService();
  }

  async login(req: Request, res: Response) {
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
