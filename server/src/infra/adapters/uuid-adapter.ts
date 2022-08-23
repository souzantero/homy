import { v4 } from 'uuid'
import { Identifier } from '../../domain/protocols/identifier'

export class UuidAdapter implements Identifier {
  identify(): string {
    return v4()
  }
}
