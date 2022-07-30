import { createContext, useContext } from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { ChakraProvider } from '@chakra-ui/react'
import { Repository } from './domain/repositories/repository'
import { FoodMemoryRepository } from './infra/repositories/food-memory-repository'
import { FoodScaffold } from './app/components/food/FoodScaffold'

export type AppManager = {
  repository: Repository
}

const app: AppManager = {
  repository: {
    food: new FoodMemoryRepository([
      { id: Date.now().toString() + '1', name: 'Banana', expiresIn: 5, createdAt: new Date() },
      { id: Date.now().toString() + '2', name: 'Maçã', expiresIn: 5, createdAt: new Date() },
      { id: Date.now().toString() + '3', name: 'Mamão', expiresIn: 5, createdAt: new Date() },
      { id: Date.now().toString() + '4', name: 'Tomate', expiresIn: 5, createdAt: new Date() },
      { id: Date.now().toString() + '5', name: 'Cenoura', expiresIn: 5, createdAt: new Date() },
    ])
  }
}

export const AppContext = createContext(app)

export const useApp = () => {
  return useContext(AppContext)
}

function App() {
  return (
    <ChakraProvider>
      <AppContext.Provider value={app}>
        <BrowserRouter>
          <Routes>
            <Route index element={<FoodScaffold />}/>
          </Routes>
        </BrowserRouter>
      </AppContext.Provider>
    </ChakraProvider>
  );
}

export default App;
