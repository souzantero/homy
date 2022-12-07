import { ButtonGroup, Skeleton } from '@chakra-ui/react'
import { useNavigate, useParams } from 'react-router-dom'
import { Role } from '../../../../domain'
import {
  If,
  NavButton,
  Page,
  PageBody,
  PageHeader,
  SupplyInfo
} from '../../../../web'
import { useSupply, useAuthorization, useSignedUser } from '../../../hooks'

export function SupplyInfoPage() {
  const navigate = useNavigate()
  const { isSigned } = useSignedUser()
  const { isAuthorized } = useAuthorization(Role.Admin)
  const { supplyId } = useParams()
  const { isLoading, supply } = useSupply(supplyId!)

  return (
    <Page>
      <PageHeader title={'Suprimento'}>
        <ButtonGroup>
          <If condition={isSigned}>
            <NavButton
              onNavigate={() => navigate(`/manager/supplies/${supplyId}/edit`)}
              isLoading={isLoading}
              isDisabled={!isAuthorized || isLoading || !supply}
            >
              Editar
            </NavButton>
          </If>
        </ButtonGroup>
      </PageHeader>
      <PageBody>
        {isLoading ? <Skeleton /> : <SupplyInfo supply={supply!} />}
      </PageBody>
    </Page>
  )
}
