export interface TokenGeneratorService {
  token(payload: { userId: string }): Promise<string>;
  refreshToken(token: string): Promise<string>;
}
