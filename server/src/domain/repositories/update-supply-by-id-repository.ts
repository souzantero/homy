import { Supply } from '../models/supply'

export interface UpdateSupplyByIdRepository {
  updateById(
    id: string,
    data: UpdateSupplyByIdRepository.Data
  ): Promise<UpdateSupplyByIdRepository.Result>
}

export namespace UpdateSupplyByIdRepository {
  export type Data = Omit<Partial<Supply>, 'id' | 'createdAt'>
  export type Result = Supply
}
