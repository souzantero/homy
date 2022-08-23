import { LoadSignedUserService } from '../../domain/services/load-signed-user-service'
import { SignedUserLocalStorageRepository } from '../../infra/repositories/local-storage/signed-user-local-storage-repository'
import { SignedUserSessionStorageRepository } from '../../infra/repositories/session-storage/signed-user-session-storage-repository'
import { SignedUserStorageRepository } from '../../infra/repositories/storage/signed-user-storage-repository'

export const makeLoadSignedUserService = () => {
  const signedUserLocalStorageRepository =
    new SignedUserLocalStorageRepository()
  const signedUserSessionStorageRepository =
    new SignedUserSessionStorageRepository()
  const signedUserRepository = new SignedUserStorageRepository(
    signedUserLocalStorageRepository,
    signedUserSessionStorageRepository
  )
  return new LoadSignedUserService(signedUserRepository)
}
