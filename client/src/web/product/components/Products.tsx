import { ButtonGroup } from '@chakra-ui/react'
import { Role } from '../../../domain'
import { Authorization, Signed } from '../../auth'
import { NavButton, Page, PageBody, PageHeader } from '../../layout'
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
