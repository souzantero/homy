import { Routes, Route, useNavigate } from 'react-router-dom'
import { Role } from './domain'
import { If, UnauthorizedUser, UnsignedUser } from './web'

import { SignUpPage } from './app/pages/auth/sign-up'
import { SignInPage } from './app/pages/auth/sign-in'
import { AddSupplyPage } from './app/pages/manager/supplies/add'
import { EditSupplyPage } from './app/pages/manager/supplies/edit'
import { SuppliesPage } from './app/pages/manager/supplies/index'
import { SupplyInfoPage } from './app/pages/manager/supplies/show'
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
        <Route path="supplies">
          <Route index element={<SuppliesPage />} />
          <Route
            path="new"
            element={
              <If
                condition={isSigned}
                or={<UnsignedUser onSignIn={() => navigate('/auth/sign-in')} />}
              >
                <If condition={isAuthorized} or={<UnauthorizedUser />}>
                  <AddSupplyPage />
                </If>
              </If>
            }
          />
          <Route path=":supplyId">
            <Route index element={<SupplyInfoPage />} />
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
                    <EditSupplyPage />
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
