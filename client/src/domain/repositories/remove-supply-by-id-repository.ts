export interface RemoveSupplyByIdRepository {
  removeById(id: string): Promise<void>
}
