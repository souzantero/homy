import { ChakraProvider } from '@chakra-ui/react'
import { Foods } from './app/components/Foods'
import { RepositoryContext } from './app/contexts/RepositoryContext'
import { Repository } from './domain/repositories/repository'
export interface AppProps {
  repository: Repository
}

function App({ repository }: AppProps) {
  return (
    <ChakraProvider>
      <RepositoryContext.Provider value={repository}>
        <Foods />
      </RepositoryContext.Provider>
    </ChakraProvider>
  );
}

export default App;
