import { Skeleton } from "@chakra-ui/react";
import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { useFoods } from "../../hooks/useFoods";
import { Page } from "../layout/Page";
import { PageHeader } from "../layout/PageHeader";

export function Food() {
  const { foodId } = useParams()
  const { foods, isLoading } = useFoods()
  const food = useMemo(() => foods.find(food => food.id === foodId), [foods])
  if (isLoading) return <Skeleton/>
  return (
    <Page>
      <PageHeader title={'Alimento'}/>
    </Page>
  )
}