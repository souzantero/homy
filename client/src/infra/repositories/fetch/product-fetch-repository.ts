import {
  AddProductRepository,
  LoadProductByIdRepository,
  LoadProductsRepository,
  Product,
  RemoveProductByIdRepository,
  UpdateProductByIdRepository
} from '@retailer/client/domain'
import { parseIntOrZeroIfNaN } from '@retailer/client/domain/utils'

export class ProductFetchRepository
  implements
    AddProductRepository,
    LoadProductByIdRepository,
    LoadProductsRepository,
    UpdateProductByIdRepository,
    RemoveProductByIdRepository
{
  constructor(
    private readonly hostAddress: string,
    private readonly authorizationToken: string = ''
  ) {}

  private toModel(product: any) {
    return {
      id: product.id,
      name: product.name,
      createdAt: new Date(product.createdAt),
      updatedAt: product.updatedAt ? new Date(product.createdAt) : undefined,
      expiresIn: parseIntOrZeroIfNaN(product.expiresIn)
    }
  }

  async removeById(id: string): Promise<void> {
    const response = await fetch(`${this.hostAddress}/products/${id}`, {
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

  async add(params: AddProductRepository.Params): Promise<Product> {
    const response = await fetch(`${this.hostAddress}/products`, {
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
    data: UpdateProductByIdRepository.Data
  ): Promise<Product> {
    const response = await fetch(`${this.hostAddress}/products/${id}`, {
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

  async loadOneById(productId: string): Promise<Product> {
    const response = await fetch(`${this.hostAddress}/products/${productId}`)
    const body = await response.json()

    if (!response.ok) {
      throw new Error(body.message)
    }

    return this.toModel(body)
  }

  async loadAll(): Promise<Product[]> {
    const response = await fetch(`${this.hostAddress}/products`)
    const body = await response.json()

    if (!response.ok) {
      throw new Error(body.message)
    }

    return body.map(this.toModel)
  }
}
