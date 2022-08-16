import { Decrypter } from '../../domain/protocols/decrypter'
import { Encrypter } from '../../domain/protocols/encrypter'

import * as jwt from 'jsonwebtoken'

export class JwtAdapter implements Encrypter, Decrypter {
  constructor(private readonly secret: string) { }

  async encrypt(plaintext: string): Promise<string> {
    return jwt.sign({ sub: plaintext, iat: Date.now() }, this.secret)
  }

  async decrypt(ciphertext: string): Promise<string> {
    return jwt.verify(ciphertext, this.secret) as string
  }
}
