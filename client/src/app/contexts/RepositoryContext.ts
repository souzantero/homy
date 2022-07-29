import { createContext } from "react"
import { Repository } from "../../domain/repositories/repository"

export const RepositoryContext = createContext<Repository | undefined>(undefined)