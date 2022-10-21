import { useNavigate } from 'react-router-dom'
import { useToast } from '@chakra-ui/react'
import { Header as HeaderComponent, UserMenu, useSignOut } from '../../web'
import { useSignedUser } from '../hooks'
import { makeSignOut } from '../factories/services'

export function Header({ onOpen }: { onOpen: () => void }) {
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
    <HeaderComponent
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
  )
}
