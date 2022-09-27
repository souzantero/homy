export interface RemoveProductByIdRepository {
  removeById(id: string): Promise<void>
}
