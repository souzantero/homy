import { ButtonGroup, Skeleton } from "@chakra-ui/react"
import { useParams } from "react-router-dom"
import { useFood } from "../../hooks/useFood"
import { Page } from "../layout/Page"
import { PageBody } from "../layout/PageBody"
import { PageHeader } from "../layout/PageHeader"

export function Food() {
  const { foodId } = useParams()
  const { isLoading } = useFood(foodId || '')
  if (isLoading) return <Skeleton/>
  return (
    <Page>
      <PageHeader title={'Alimento'}>
        <ButtonGroup>

        </ButtonGroup>
      </PageHeader>
      <PageBody>

      </PageBody>
    </Page>
  )
}