import * as bcrypt from 'bcrypt'
import { HashComparer } from '../../domain/protocols/hash-comparer'
import { Hasher } from '../../domain/protocols/hasher'

export class BcryptAdapter implements Hasher, HashComparer {
  constructor(private readonly salt: number) { }

  async hash(plaintext: string): Promise<string> {
    return bcrypt.hash(plaintext, this.salt)
  }

  async compare(plaintext: string, digest: string): Promise<boolean> {
    return bcrypt.compare(plaintext, digest)
  }
}
