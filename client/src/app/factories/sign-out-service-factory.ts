import { SignedUserLocalStorageRepository } from '../../infra/repositories/local-storage/signed-user-local-storage-repository'
import { SignOutService } from '../../domain/services/sign-out-service'

export const makeSignOutService = () => {
  const signedUserRepository = new SignedUserLocalStorageRepository()
  return new SignOutService(signedUserRepository)
}
