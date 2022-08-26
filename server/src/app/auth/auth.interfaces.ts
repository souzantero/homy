import { Request } from 'express'
import { User } from '../../domain/models/user'

export interface AuthenticatedRequest extends Request {
  user: User
}
