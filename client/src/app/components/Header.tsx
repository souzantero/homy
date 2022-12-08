import { useNavigate } from 'react-router-dom'
import { Header as HeaderComponent, UserMenu } from '../../web'
import { useSignedUser, useSignOut } from '../hooks'

export function Header({ onOpen }: { onOpen: () => void }) {
  const navigate = useNavigate()
  const { signedUser, isLoading } = useSignedUser()
  const { signOut, isSigningOut } = useSignOut({
    onSignedOut() {
      window.location.reload()
    }
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
