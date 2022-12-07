import { useToast } from '@chakra-ui/react'
import { useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Page, PageBody, PageHeader } from '../../../../web'
import { SupplyForm } from '../../../../web/components/supply/SupplyForm'
import { makeUpdateSupplyByIdRepository } from '../../../factories'
import { useSignedUser } from '../../../hooks'
import { useSupply } from '../../../hooks/useSupply'

export function EditSupplyPage() {
  const notify = useToast()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { supplyId } = useParams()
  const { signedUser } = useSignedUser()
  const { supply, isLoading } = useSupply(supplyId!)

  const [name, setName] = useState<string>('')
  const [isUpdating, setIsUpdating] = useState(false)

  const updateSupply = async () => {
    try {
      setIsUpdating(true)
      const repository = makeUpdateSupplyByIdRepository(
        signedUser!.authorizationToken!
      )
      const updatedSupply = await repository.updateById(supplyId!, {
        name
      })
      setName('')

      notify({
        status: 'success',
        title: 'Suprimento atualizado.',
        description: 'Suprimento atualizado com sucesso.'
      })

      queryClient.invalidateQueries(['supplies'])
      navigate('/manager/supplies')
      return updatedSupply
    } catch (error) {
      const status = 'error'
      const title = 'Falha ao atualizar produto.'
      const description =
        error instanceof Error
          ? error.message
          : 'Não foi possível atualizar o suprimento no momento, tente novamente mais tarde.'
      notify({ status, title, description })
    } finally {
      setIsUpdating(false)
    }
  }

  useEffect(() => {
    if (supply) {
      setName(supply.name)
    }
  }, [supply])

  return (
    <Page>
      <PageHeader title="Editar suprimento" />
      <PageBody>
        <SupplyForm
          value={{ name }}
          onChange={(data) => setName(data.name)}
          onSubmit={updateSupply}
          isDisabled={isLoading || isUpdating}
          isLoading={isLoading || isUpdating}
          buttonText="Salvar"
          buttonLoadingText="Salvando..."
        />
      </PageBody>
    </Page>
  )
}
