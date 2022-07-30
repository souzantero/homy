import { useContext } from "react"
import { Repository } from "../../domain/repositories/repository"
import { RepositoryContext } from "../contexts/RepositoryContext"

export function useRepository(): Repository {
  return useContext(RepositoryContext)!
}