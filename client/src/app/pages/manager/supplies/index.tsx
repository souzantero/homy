import { ButtonGroup, useToast } from '@chakra-ui/react'
import { useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Role, Supply } from '../../../../domain'
import {
  If,
  NavButton,
  Page,
  PageBody,
  PageHeader,
  SupplyTable
} from '../../../../web'
import { makeRemoveSupplyByIdRepository } from '../../../factories'
import { useAuthorization, useSupplies, useSignedUser } from '../../../hooks'

export function SuppliesPage() {
  const notify = useToast()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { supplies, isLoading } = useSupplies()
  const { signedUser } = useSignedUser()
  const { isSigned } = useSignedUser()
  const { isAuthorized } = useAuthorization(Role.Admin)

  const [isRemoving, setIsRemoving] = useState(false)

  const removeSupply = async (supply: Supply) => {
    try {
      setIsRemoving(true)
      const repository = makeRemoveSupplyByIdRepository(
        signedUser?.authorizationToken!
      )

      await repository.removeById(supply.id)

      notify({
        status: 'success',
        title: 'Suprimento removido.',
        description: 'Suprimento removido com sucesso.'
      })

      queryClient.invalidateQueries(['supplies'])

      return true
    } catch (error) {
      const status = 'error'
      const title = 'Falha ao remover suprimento.'
      const description =
        error instanceof Error
          ? error.message
          : 'Não foi possível remover o suprimento no momento, tente novamente mais tarde.'
      notify({ status, title, description })
      return false
    } finally {
      setIsRemoving(false)
    }
  }

  return (
    <Page>
      <PageHeader title="Suprimentos">
        <ButtonGroup>
          <If condition={isSigned}>
            <NavButton
              onNavigate={() => navigate('/manager/supplies/new')}
              isDisabled={!isAuthorized}
            >
              Adicionar
            </NavButton>
          </If>
        </ButtonGroup>
      </PageHeader>
      <PageBody>
        <SupplyTable
          supplies={supplies}
          isReadOnly={!isSigned}
          isDisabled={!isAuthorized}
          isLoading={isLoading || isRemoving}
          onShowSupply={(supply) => navigate(`/manager/supplies/${supply.id}`)}
          onRemoveSupply={(supply) => removeSupply(supply)}
        />
      </PageBody>
    </Page>
  )
}
