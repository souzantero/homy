import { ChakraProvider } from '@chakra-ui/react'
import { FoodScaffold } from './app/components/food/FoodScaffold'
import { RepositoryContext } from './app/contexts/RepositoryContext'
import { Repository } from './domain/repositories/repository'
export interface AppProps {
  repository: Repository
}

function App({ repository }: AppProps) {
  return (
    <ChakraProvider>
      <RepositoryContext.Provider value={repository}>
        <FoodScaffold />
      </RepositoryContext.Provider>
    </ChakraProvider>
  );
}

export default App;
