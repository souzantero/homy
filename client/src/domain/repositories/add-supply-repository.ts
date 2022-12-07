import { Supply } from '../models/supply'

export interface AddSupplyRepository {
  add(params: AddSupplyRepository.Params): Promise<AddSupplyRepository.Result>
}
export namespace AddSupplyRepository {
  export type Params = {
    name: string
  }

  export type Result = Supply
}
