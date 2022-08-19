import { LoadSignedUserService } from "../../domain/services/load-signed-user-service"
import { SignedUserLocalStorageRepository } from "../../infra/repositories/local-storage/signed-user-local-storage-repository"

export const makeLoadSignedUserService = () => {
  const signedUserRepository = new SignedUserLocalStorageRepository()
  return new LoadSignedUserService(signedUserRepository)
}