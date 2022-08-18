import { User } from "../models/user";

export interface UpdateSignedUserRepository {
  updateSignedUser(user: User): Promise<void>
}