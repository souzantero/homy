import { User } from '../../../domain/models/user'

export type SignUpOutput = Omit<
  User,
  'deletedAt' | 'password' | 'emailConfirmationCode'
>
