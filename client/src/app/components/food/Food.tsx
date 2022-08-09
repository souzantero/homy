import { Box, ButtonGroup, Flex, Skeleton, Text } from "@chakra-ui/react"
import { useParams } from "react-router-dom"
import { useFood } from "../../hooks/useFood"
import { NavButton } from "../button/NavButton"
import { Page } from "../layout/Page"
import { PageBody } from "../layout/PageBody"
import { PageHeader } from "../layout/PageHeader"

function TextDisplay({
  label, 
  value
}: { label: string, value?: string }) {
  return (
    <Flex>
      <Text fontWeight={'bold'}>{label}:</Text>
      <Box width={'10px'}/>
      <Text>{value}</Text>
    </Flex>
  )
}

export function Food() {
  const { foodId } = useParams()
  const { isLoading, food } = useFood(foodId || '')
  if (isLoading) return <Skeleton/>
  return (
    <Page>
      <PageHeader title={'Alimento'}>
        <ButtonGroup>
          <NavButton to={`/foods/${foodId}/edit`} isLoading={isLoading} isDisabled={isLoading || !food}>
            Editar
          </NavButton>
        </ButtonGroup>
      </PageHeader>
      <PageBody>
        <TextDisplay label='Código de identificação' value={food?.id.toString()}/>
        <TextDisplay label='Nome' value={food?.name.toString()}/>
        <TextDisplay label='Validade' value={`${food?.expiresIn} ${food?.expiresIn === 1 ? 'dia' : 'dias'}`}/>
        <TextDisplay label='Criado em' value={food?.createdAt.toLocaleString()}/>
        {food?.updatedAt && (<TextDisplay label='Última atualização' value={food?.updatedAt.toLocaleString()} />)}
      </PageBody>
    </Page>
  )
}