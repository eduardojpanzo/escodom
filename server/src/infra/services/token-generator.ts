import { TokenGeneratorService } from "#core/services/token-generator.js";
import { SignJWT } from "jose";

export class JwtTokenGenerator implements TokenGeneratorService {
  constructor(private readonly secret?: string) {}

  async token(payload: { user_id: string; email: string }): Promise<string> {
    return new SignJWT(payload)
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("10h")
      .sign(new TextEncoder().encode(this.secret));
  }
  async refreshToken(token: string): Promise<string> {
    return new SignJWT({ payload: token })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("10h")
      .sign(new TextEncoder().encode(this.secret));
  }
}
