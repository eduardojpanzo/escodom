export interface TokenGeneratorService {
  token(payload: { personId: string }): Promise<string>;
  refreshToken(token: string): Promise<string>;
}
