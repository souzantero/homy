import { Supply } from '../models/supply'

export interface AddSupplyRepository {
  add(supply: AddSupplyRepository.Params): Promise<AddSupplyRepository.Result>
}

export namespace AddSupplyRepository {
  export type Params = {
    id: string
    name: string
    createdAt: Date
  }

  export type Result = Supply
}
