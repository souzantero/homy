import { LoadSignedUser } from '../../../domain'
import {
  SignedUserLocalStorageRepository,
  SignedUserSessionStorageRepository,
  SignedUserStorageRepository
} from '../../../infra'

export const makeLoadSignedUser = () => {
  const signedUserLocalStorageRepository =
    new SignedUserLocalStorageRepository()
  const signedUserSessionStorageRepository =
    new SignedUserSessionStorageRepository()
  const signedUserRepository = new SignedUserStorageRepository(
    signedUserLocalStorageRepository,
    signedUserSessionStorageRepository
  )
  return new LoadSignedUser(signedUserRepository)
}
