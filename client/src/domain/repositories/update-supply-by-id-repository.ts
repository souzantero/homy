import { Supply } from '../models/supply'

export interface UpdateSupplyByIdRepository {
  updateById(
    id: string,
    data: UpdateSupplyByIdRepository.Data
  ): Promise<UpdateSupplyByIdRepository.Result>
}
export namespace UpdateSupplyByIdRepository {
  export type Data = {
    name: string
  }

  export type Result = Supply
}
