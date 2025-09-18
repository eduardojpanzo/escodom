import bcrypt from "bcrypt";
import { PasswordHasherService } from "#core/services/password_hasher.js";

export class BcryptPasswordHasher implements PasswordHasherService {
  async hash(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  async compare(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
}
