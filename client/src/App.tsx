import { Routes, Route, useNavigate } from 'react-router-dom'
import { Role } from './domain'
import { If, UnauthorizedUser, UnsignedUser } from './web'

import { SignUpPage } from './app/pages/auth/sign-up'
import { SignInPage } from './app/pages/auth/sign-in'
import { AddProductPage } from './app/pages/manager/products/add'
import { EditProductPage } from './app/pages/manager/products/edit'
import { ProductsPage } from './app/pages/manager/products/index'
import { ProductPage } from './app/pages/manager/products/show'
import { ConfirmUserEmailPage } from './app/pages/users/confirm-email'
import { ForgetUserPasswordPage } from './app/pages/users/forget-password'
import { ResetUserPasswordPage } from './app/pages/users/reset-password'
import { Manager, Store } from './app/components'
import { useAuthorization, useSignedUser } from './app/hooks'

function App() {
  const navigate = useNavigate()
  const { isSigned } = useSignedUser()
  const { isAuthorized } = useAuthorization(Role.Admin)

  return (
    <Routes>
      <Route path="auth">
        <Route path="sign-in" element={<SignInPage />} />
        <Route path="sign-up" element={<SignUpPage />} />
      </Route>
      <Route path="users">
        <Route path="confirm-email" element={<ConfirmUserEmailPage />} />
        <Route path="forget-password" element={<ForgetUserPasswordPage />} />
        <Route path="reset-password" element={<ResetUserPasswordPage />} />
      </Route>
      <Route path="manager" element={<Manager />}>
        <Route path="products">
          <Route index element={<ProductsPage />} />
          <Route
            path="new"
            element={
              <If
                condition={isSigned}
                or={<UnsignedUser onSignIn={() => navigate('/auth/sign-in')} />}
              >
                <If condition={isAuthorized} or={<UnauthorizedUser />}>
                  <AddProductPage />
                </If>
              </If>
            }
          />
          <Route path=":productId">
            <Route index element={<ProductPage />} />
            <Route
              path="edit"
              element={
                <If
                  condition={isSigned}
                  or={
                    <UnsignedUser onSignIn={() => navigate('/auth/sign-in')} />
                  }
                >
                  <If condition={isAuthorized} or={<UnauthorizedUser />}>
                    <EditProductPage />
                  </If>
                </If>
              }
            />
          </Route>
        </Route>
      </Route>
      <Route path="/" element={<Store />} />
    </Routes>
  )
}

export default App
