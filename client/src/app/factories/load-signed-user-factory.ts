import { LoadSignedUser } from '@retailer/client/domain'
import {
  SignedUserLocalStorageRepository,
  SignedUserSessionStorageRepository,
  SignedUserStorageRepository
} from '@retailer/client/infra'

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
