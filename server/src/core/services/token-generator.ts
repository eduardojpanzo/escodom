export interface TokenGeneratorService {
  token(payload: { email: string }): Promise<string>;
  refreshToken(token: string): Promise<string>;
}
