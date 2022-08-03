import { Button, Td, Tr } from "@chakra-ui/react"
import { Food } from "../../../domain/models/food"
import { useRemoveFood } from "../../hooks/useRemoveFood"

export interface FoodTableRowProps {
  food: Food
}

export function FoodTableRow({
  food
}: FoodTableRowProps) {
  const { removeFood, isRemoving } = useRemoveFood()
  return (
    <Tr>
      <Td>{food.id}</Td>
      <Td>{food.name}</Td>
      <Td isNumeric>{food.expiresIn.toString()} </Td>
      <Td>
        <Button
          color={'red'}
          isDisabled={isRemoving.valueOf()}
          isLoading={isRemoving.valueOf()}
          onClick={() => removeFood(food)}
        >
          Remover
        </Button>
      </Td>
    </Tr>
  )
}