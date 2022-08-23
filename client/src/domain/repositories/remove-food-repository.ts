export interface RemoveFoodRepository {
  removeById(id: string): Promise<void>
}
