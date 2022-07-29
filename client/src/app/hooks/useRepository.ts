import { useContext } from "react"
import { Repository } from "../../domain/repositories/repository"
import { RepositoryContext } from "../contexts/RepositoryContext"

export type Result = {
  repository?: Repository
}

export function useRepository(): Result {
  const repository = useContext(RepositoryContext)
  return { repository }
}