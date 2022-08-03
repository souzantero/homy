export interface RemoveFoodRepository {
  removeById(id: String): Promise<void>
}