import { LoadSignedUser } from '../../domain/services/load-signed-user'
import { SignedUserLocalStorageRepository } from '../../infra/repositories/local-storage/signed-user-local-storage-repository'
import { SignedUserSessionStorageRepository } from '../../infra/repositories/session-storage/signed-user-session-storage-repository'
import { SignedUserStorageRepository } from '../../infra/repositories/storage/signed-user-storage-repository'

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
