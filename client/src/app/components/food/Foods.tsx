import { ButtonGroup } from '@chakra-ui/react'
import { NavButton } from '../button/NavButton'
import { Page } from '../layout/Page'
import { PageBody } from '../layout/PageBody'
import { PageHeader } from '../layout/PageHeader'
import { FoodTable } from './FoodTable'

export function Foods() {
  return (
    <Page>
      <PageHeader title='Alimentos'>
        <ButtonGroup>
          <NavButton to={'/foods/new'}>
            Adicionar
          </NavButton>
        </ButtonGroup>
      </PageHeader>
      <PageBody>
        <FoodTable />
      </PageBody>
    </Page>
  )
}