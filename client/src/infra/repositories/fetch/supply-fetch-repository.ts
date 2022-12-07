import {
  AddSupplyRepository,
  LoadSupplyByIdRepository,
  LoadSuppliesRepository,
  Supply,
  RemoveSupplyByIdRepository,
  UpdateSupplyByIdRepository
} from '../../../domain'
import { parseIntOrZeroIfNaN } from '../../../domain/utils'

export class SupplyFetchRepository
  implements
    AddSupplyRepository,
    LoadSupplyByIdRepository,
    LoadSuppliesRepository,
    RemoveSupplyByIdRepository,
    UpdateSupplyByIdRepository
{
  constructor(
    private readonly hostAddress: string,
    private readonly authorizationToken: string = ''
  ) {}

  private toModel(supply: any): Supply {
    return {
      id: supply.id,
      name: supply.name,
      createdAt: new Date(supply.createdAt),
      updatedAt: supply.updatedAt ? new Date(supply.createdAt) : undefined
      // expiresIn: parseIntOrZeroIfNaN(supply.expiresIn)
    }
  }

  async removeById(id: string): Promise<void> {
    const response = await fetch(`${this.hostAddress}/supplies/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${this.authorizationToken}`
      }
    })

    if (!response.ok) {
      const body = await response.json()
      throw new Error(body.message)
    }
  }

  async add(params: AddSupplyRepository.Params): Promise<Supply> {
    const response = await fetch(`${this.hostAddress}/supplies`, {
      method: 'POST',
      body: JSON.stringify(params),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.authorizationToken}`
      }
    })

    const body = await response.json()

    if (!response.ok) {
      throw new Error(body.message)
    }

    return this.toModel(body)
  }

  async updateById(
    id: string,
    data: UpdateSupplyByIdRepository.Data
  ): Promise<Supply> {
    const response = await fetch(`${this.hostAddress}/supplies/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.authorizationToken}`
      }
    })

    const body = await response.json()

    if (!response.ok) {
      throw new Error(body.message)
    }

    return this.toModel(body)
  }

  async loadOneById(supplyId: string): Promise<Supply> {
    const response = await fetch(`${this.hostAddress}/supplies/${supplyId}`)
    const body = await response.json()

    if (!response.ok) {
      throw new Error(body.message)
    }

    return this.toModel(body)
  }

  async loadAll(): Promise<Supply[]> {
    const response = await fetch(`${this.hostAddress}/supplies`)
    const body = await response.json()

    if (!response.ok) {
      throw new Error(body.message)
    }

    return body.map(this.toModel)
  }
}
