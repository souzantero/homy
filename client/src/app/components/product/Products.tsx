import { ButtonGroup } from '@chakra-ui/react'
import { Role } from '@retailer/client/domain'
import { Authorization } from '../auth/Authorization'
import { Signed } from '../auth/sign-in/Signed'
import { NavButton } from '../button/NavButton'
import { Page } from '../layout/Page'
import { PageBody } from '../layout/PageBody'
import { PageHeader } from '../layout/PageHeader'
import { ProductTable } from './ProductTable'

export function Products() {
  return (
    <Page>
      <PageHeader title="Produtos">
        <ButtonGroup>
          <Signed>
            <Authorization roles={[Role.Admin]} disable>
              <NavButton to={'/products/new'}>Adicionar</NavButton>
            </Authorization>
          </Signed>
        </ButtonGroup>
      </PageHeader>
      <PageBody>
        <ProductTable />
      </PageBody>
    </Page>
  )
}
