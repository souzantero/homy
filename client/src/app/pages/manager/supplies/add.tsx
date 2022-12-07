import { useToast } from '@chakra-ui/react'
import { useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Page, PageBody, PageHeader, SupplyForm } from '../../../../web'
import { makeAddSupplyRepository } from '../../../factories'
import { useSignedUser } from '../../../hooks'

export function AddSupplyPage() {
  const notify = useToast()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { signedUser } = useSignedUser()
  const [name, setName] = useState<string>('')
  const [isAdding, setIsAdding] = useState(false)

  const addSupply = async () => {
    try {
      setIsAdding(true)
      const repository = makeAddSupplyRepository(
        signedUser!.authorizationToken!
      )
      const supply = await repository.add({ name })
      setName('')

      notify({
        status: 'success',
        title: 'Suprimento adicionado.',
        description: 'Suprimento adicionado com sucesso.'
      })

      queryClient.invalidateQueries(['supplies'])
      navigate('/manager/supplies')

      return supply
    } catch (error) {
      const status = 'error'
      const title = 'Falha ao adicionar suprimento.'
      const description =
        error instanceof Error
          ? error.message
          : 'Não foi possível adicionar o suprimento no momento, tente novamente mais tarde.'

      notify({ status, title, description })
    } finally {
      setIsAdding(false)
    }
  }

  return (
    <Page>
      <PageHeader title="Adicionar suprimento" />
      <PageBody>
        <SupplyForm
          value={{ name }}
          onChange={(data) => setName(data.name)}
          onSubmit={addSupply}
          isDisabled={isAdding}
          isLoading={isAdding}
        />
      </PageBody>
    </Page>
  )
}
