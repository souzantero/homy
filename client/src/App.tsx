import { createContext, useContext } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { Foods } from './app/components/food/Foods'
import { SidebarWithHeader } from './app/components/layout/SidebarWithHeader'
import { AddFood } from './app/components/food/AddFood'
import { Food } from './app/components/food/Food'
import { EditFood } from './app/components/food/EditFood'
import { SignIn } from './app/components/auth/sign-in/SignIn'
import { Signed } from './app/components/auth/sign-in/Signed'
import { UnsignedUser } from './app/components/auth/sign-in/UnsignedUser'
import { SignUp } from './app/components/auth/sign-up/SignUp'
import { Authorization } from './app/components/auth/Authorization'
import { Role } from './domain/models/user'
import { UnauthorizedUser } from './app/components/auth/UnauthorizedUser'

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
              <Route path="auth">
                <Route path="sign-in" element={<SignIn />} />
                <Route path="sign-up" element={<SignUp />} />
              </Route>
              <Route path="/" element={<SidebarWithHeader />}>
                <Route path="foods">
                  <Route index element={<Foods />} />
                  <Route
                    path="new"
                    element={
                      <Signed unsigned={<UnsignedUser />}>
                        <Authorization
                          roles={[Role.Admin]}
                          unauthorized={<UnauthorizedUser />}
                        >
                          <AddFood />
                        </Authorization>
                      </Signed>
                    }
                  />
                  <Route path=":foodId">
                    <Route index element={<Food />} />
                    <Route
                      path="edit"
                      element={
                        <Signed unsigned={<UnsignedUser />}>
                          <Authorization
                            roles={[Role.Admin]}
                            unauthorized={<UnauthorizedUser />}
                          >
                            <EditFood />
                          </Authorization>
                        </Signed>
                      }
                    />
                  </Route>
                </Route>
              </Route>
            </Routes>
          </BrowserRouter>
        </AppContext.Provider>
      </QueryClientProvider>
    </ChakraProvider>
  )
}

export default App
