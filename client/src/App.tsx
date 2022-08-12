import { createContext, useContext } from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { ChakraProvider, useToast } from '@chakra-ui/react'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

import env from './app/config/env'
import { Repository } from './domain/repositories/repository'
import { FoodFetchRepository } from './infra/repositories/fetch/food-fetch-repository'
import { Foods } from './app/components/food/Foods'
import { Sidebar } from './app/components/layout/Sidebar'
import { AddFood } from './app/components/food/AddFood'
import { Food } from './app/components/food/Food'
import { EditFood } from './app/components/food/EditFood'
import { Notifier } from './domain/protocols/notifier';

export type AppManager = {
  repository: Repository,
  useNotify: () => (paras: Notifier.Params) => void
}

const app: AppManager = {
  repository: {
    food: new FoodFetchRepository(env.serverHostAddress)
  },
  useNotify: useToast
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
              <Route path='/' element={<Sidebar/>}>
                <Route path='foods'>
                  <Route index element={<Foods />}/>
                  <Route path='new' element={<AddFood/>}/>
                  <Route path=':foodId'>
                    <Route index element={<Food/>}/>
                    <Route path='edit' element={<EditFood/>}/>
                  </Route>
                </Route>
              </Route>
            </Routes>
          </BrowserRouter>
        </AppContext.Provider>
      </QueryClientProvider>
    </ChakraProvider>
  );
}

export default App;
