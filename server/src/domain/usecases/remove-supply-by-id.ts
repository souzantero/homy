import { UpdateSupplyById } from './update-supply-by-id'

export class RemoveSupplyById {
  constructor(private readonly updateSupplyById: UpdateSupplyById) {}

  async remove(id: string): Promise<void> {
    const data = {
      deletedAt: new Date()
    }

    await this.updateSupplyById.updateById(id, data)
  }
}
