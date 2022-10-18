import { useToast } from '@chakra-ui/react'
import { useMemo } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import {
  ConfirmUserEmail,
  useConfirmUserEmail,
  useRefreshUserEmailConfirmationCode
} from '../../../web'
import { makeConfirmUserEmail } from '../../factories'
import { makeRefreshUserEmailConfirmationCode } from '../../factories/refresh-user-email-confirmation-code-factory'

export function ConfirmUserEmailPage() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const notify = useToast()

  const email = useMemo(() => searchParams.get('email') || '', [searchParams])

  const confirmUserEmail = makeConfirmUserEmail()
  const { confirmationCode, setConfirmationCode, isConfirming, confirm } =
    useConfirmUserEmail({
      confirmUserEmail,
      onNotify: notify,
      onConfirmed() {
        navigate('/')
      }
    })

  const refreshUserEmailConfirmationCode =
    makeRefreshUserEmailConfirmationCode()
  const { isRefreshing, refresh } = useRefreshUserEmailConfirmationCode({
    refreshUserEmailConfirmationCode,
    onNotify: notify
  })

  return (
    <ConfirmUserEmail
      email={email}
      confirmationCode={confirmationCode}
      onChangeConfirmationCode={setConfirmationCode}
      onConfirm={confirm}
      isConfirming={isConfirming}
      onRefresh={refresh}
      isRefreshing={isRefreshing}
    />
  )
}
