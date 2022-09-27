import { createContext, useContext } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Role } from './domain'
import {
  AddProduct,
  Authorization,
  ConfirmUserEmail,
  EditProduct,
  Product,
  Products,
  SidebarWithHeader,
  SignIn,
  Signed,
  SignUp,
  UnauthorizedUser,
  UnsignedUser
} from './app/components'

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
              <Route
                path="users/confirm-email"
                element={<ConfirmUserEmail />}
              />
              <Route path="/" element={<SidebarWithHeader />}>
                <Route path="products">
                  <Route index element={<Products />} />
                  <Route
                    path="new"
                    element={
                      <Signed unsigned={<UnsignedUser />}>
                        <Authorization
                          roles={[Role.Admin]}
                          unauthorized={<UnauthorizedUser />}
                        >
                          <AddProduct />
                        </Authorization>
                      </Signed>
                    }
                  />
                  <Route path=":productId">
                    <Route index element={<Product />} />
                    <Route
                      path="edit"
                      element={
                        <Signed unsigned={<UnsignedUser />}>
                          <Authorization
                            roles={[Role.Admin]}
                            unauthorized={<UnauthorizedUser />}
                          >
                            <EditProduct />
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
