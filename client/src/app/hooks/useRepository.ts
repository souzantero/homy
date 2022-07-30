import { Repository } from "../../domain/repositories/repository"
import { useApp } from "../../App"

export function useRepository(): Repository {
  return useApp().repository
}