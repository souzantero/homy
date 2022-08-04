import { Button, ButtonGroup } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { Page } from '../layout/Page'
import { PageBody } from '../layout/PageBody'
import { PageHeader } from '../layout/PageHeader'
import { FoodTable } from './FoodTable'

export function Foods() {
  const navigate = useNavigate()
  const handleClickAdd = () => navigate('/foods/new')
  return (
    <Page>
      <PageHeader title='Alimentos'>
        <ButtonGroup>
          <Button 
            color={'blue'}
            borderColor={'blue'}
            variant={'outline'}
            size={'sm'}
            onClick={handleClickAdd}
          >
            Adicionar
          </Button>
        </ButtonGroup>
      </PageHeader>
      <PageBody>
        <FoodTable />
      </PageBody>
    </Page>
  )
}