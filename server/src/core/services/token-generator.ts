export interface TokenGeneratorService {
  token(payload: { user_id: string; email: string }): Promise<string>;
  refreshToken(token: string): Promise<string>;
}
