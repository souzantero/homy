import { SupplyNotFoundError } from '../errors/supply-not-found-error'
import { Supply } from '../models/supply'
import { UpdateSupplyByIdRepository } from '../repositories/update-supply-by-id-repository'
import { LoadSupplyById } from './load-supply-by-id'

export class UpdateSupplyById {
  constructor(
    private readonly loadSupplyById: LoadSupplyById,
    private readonly updateSupplyByIdRepository: UpdateSupplyByIdRepository
  ) {}

  async updateById(
    id: string,
    data: UpdateSupplyById.Data
  ): Promise<UpdateSupplyById.Result> {
    const supply = await this.loadSupplyById.load(id)
    if (!supply) {
      throw new SupplyNotFoundError()
    }

    return this.updateSupplyByIdRepository.updateById(id, {
      ...data,
      updatedAt: new Date()
    })
  }
}

export namespace UpdateSupplyById {
  export type Data = Omit<UpdateSupplyByIdRepository.Data, 'updatedAt'>
  export type Result = Supply
}
