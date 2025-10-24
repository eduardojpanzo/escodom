import { JWTPayload } from "#app/dtos/users-dto.js";

export interface TokenGeneratorService {
  token(payload: JWTPayload): Promise<string>;
  refreshToken(token: string): Promise<string>;
}
