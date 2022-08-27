import { ButtonGroup } from '@chakra-ui/react'
import { Role } from '../../../domain/models/user'
import { Authorization } from '../auth/Authorization'
import { Signed } from '../auth/sign-in/Signed'
import { NavButton } from '../button/NavButton'
import { Page } from '../layout/Page'
import { PageBody } from '../layout/PageBody'
import { PageHeader } from '../layout/PageHeader'
import { FoodTable } from './FoodTable'

export function Foods() {
  return (
    <Page>
      <PageHeader title="Alimentos">
        <ButtonGroup>
          <Signed>
            <Authorization roles={[Role.Admin]}>
              <NavButton to={'/foods/new'}>Adicionar</NavButton>
            </Authorization>
          </Signed>
        </ButtonGroup>
      </PageHeader>
      <PageBody>
        <FoodTable />
      </PageBody>
    </Page>
  )
}
