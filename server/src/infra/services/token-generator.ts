import { JWTPayload } from "#app/dtos/users-dto.js";
import { TokenGeneratorService } from "#core/services/token-generator.js";
import { SignJWT } from "jose";

export class JwtTokenGenerator implements TokenGeneratorService {
  constructor(private readonly secret?: string) {}

  async token(payload: JWTPayload): Promise<string> {
    return new SignJWT(payload)
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("1h")
      .sign(new TextEncoder().encode(this.secret));
  }
  async refreshToken(token: string): Promise<string> {
    return new SignJWT({ token })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("24h")
      .sign(new TextEncoder().encode(this.secret));
  }
}
