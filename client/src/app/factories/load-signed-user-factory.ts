import { LoadSignedUser } from '@retaily/client/domain'
import {
  SignedUserLocalStorageRepository,
  SignedUserSessionStorageRepository,
  SignedUserStorageRepository
} from '@retaily/client/infra'

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
