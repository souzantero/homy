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

import { Foods } from './app/components/food/Foods'
import { Sidebar } from './app/components/layout/Sidebar'
import { AddFood } from './app/components/food/AddFood'
import { Food } from './app/components/food/Food'
import { EditFood } from './app/components/food/EditFood'
import { SignIn } from './app/components/auth/sign-in/SignIn'
import { Authenticate } from './app/components/auth/Authenticate';
import { UnauthenticatedUser } from './app/components/auth/UnauthenticatedUser';

export type AppManager = {}
const app: AppManager = {}
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
              <Route path='auth'>
                <Route path='sign-in' element={<SignIn/>} />
              </Route>
              <Route path='/' element={<Sidebar/>}>
                <Route path='foods'>
                  <Route index element={<Foods />}/>
                  <Route path='new' element={<Authenticate unauthenticated={<UnauthenticatedUser/>}><AddFood/></Authenticate>}/>
                  <Route path=':foodId'>
                    <Route index element={<Food/>}/>
                    <Route path='edit' element={<Authenticate unauthenticated={<UnauthenticatedUser/>}><EditFood/></Authenticate>}/>
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
