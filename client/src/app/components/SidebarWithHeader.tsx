import { Outlet, useNavigate } from 'react-router-dom'
import { AiOutlineCoffee } from 'react-icons/ai'
import { useDisclosure, useToast } from '@chakra-ui/react'
import { Header, Manager, Sidebar, UserMenu, useSignOut } from '../../web'
import { makeSignOut } from '../factories'
import { useSignedUser } from '../hooks'
import { NavItem } from '../../web/components/layout/NavItem'

export function SidebarWithHeader() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const navigate = useNavigate()
  const notify = useToast()

  const { signedUser, isLoading } = useSignedUser()
  const { signOut, isSigningOut } = useSignOut({
    signOutFactory: () => makeSignOut(signedUser!),
    onSignedOut() {
      window.location.reload()
    },
    onNotify: notify
  })

  return (
    <Manager
      isOpen={isOpen}
      onClose={onClose}
      header={
        <Header
          onOpen={onOpen}
          userMenu={
            <UserMenu
              user={signedUser || undefined}
              isLoading={isLoading || isSigningOut}
              onConfirmEmail={() =>
                navigate(`/users/confirm-email?email=${signedUser?.email}`)
              }
              onSignIn={() => navigate('/auth/sign-in')}
              onSignOut={signOut}
            />
          }
        />
      }
      sidebar={
        <Sidebar title="Retaily" onClose={onClose}>
          <NavItem
            icon={AiOutlineCoffee}
            onClick={() => navigate('/manager/products')}
          >
            Produtos
          </NavItem>
        </Sidebar>
      }
    >
      <Outlet />
    </Manager>
  )
}
