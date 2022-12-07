import { Supply } from '../models/supply'
import { Identifier } from '../protocols/identifier'
import { AddSupplyRepository } from '../repositories/add-supply-repository'

export class AddSupply {
  constructor(
    private readonly identifier: Identifier,
    private readonly addSupplyRepository: AddSupplyRepository
  ) {}

  async add(data: AddSupply.Params): Promise<AddSupply.Result> {
    const { name } = data
    const id = this.identifier.identify()
    const createdAt = new Date()

    return this.addSupplyRepository.add({ id, name, createdAt })
  }
}

export namespace AddSupply {
  export type Params = {
    name: string
  }

  export type Result = Supply
}
