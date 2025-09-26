// Regras de negocio para Autenticacao 
export class AuthService {
  authenticate(username: string, password: string): string | null {
    // TODO: substituir por validação no banco (Supabase)
    if (username === "admin" && password === "123456") {
      return "fake-jwt-token";
    }
    return null;
  }
}
