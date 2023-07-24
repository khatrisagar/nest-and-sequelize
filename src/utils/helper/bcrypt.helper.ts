import * as bcrypt from 'bcrypt';

export class Bcrypt {
  password: string;
  encryptedPass: string;
  constructor(password: string, encryptPassoword?: string) {
    this.password = password;
    this.encryptedPass = encryptPassoword;
  }

  async getEcryptPassword() {
    const encryptedPassword = await bcrypt.hash(this.password, 10);
    return encryptedPassword;
  }

  async getVerifiedPassword() {
    const isAuthenticated = await bcrypt.compare(
      this.password,
      this.encryptedPass,
    );
    return isAuthenticated;
  }
}
