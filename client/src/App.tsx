import { createContext, useContext } from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { ChakraProvider } from '@chakra-ui/react'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { Repository } from './domain/repositories/repository'
import { FoodFetchRepository } from './infra/repositories/fetch/food-fetch-repository'
import { FoodScaffold } from './app/components/food/FoodScaffold'
import { Sidebar } from './app/components/layout/Sidebar'
import env from './app/config/env'

export type AppManager = {
  repository: Repository
}

const app: AppManager = {
  repository: {
    food: new FoodFetchRepository(env.serverHostAddress)
  }
}

export const AppContext = createContext(app)

export const useApp = () => {
  return useContext(AppContext)
}

function App() {
  return (
    <ChakraProvider>
      <QueryClientProvider client={new QueryClient()}>
        <AppContext.Provider value={app}>
          <BrowserRouter>
            <Routes>
              <Route index element={<Sidebar><FoodScaffold /></Sidebar>}/>
            </Routes>
          </BrowserRouter>
        </AppContext.Provider>
      </QueryClientProvider>
    </ChakraProvider>
  );
}

export default App;
