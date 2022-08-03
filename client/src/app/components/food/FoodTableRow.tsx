import { Td, Tr } from "@chakra-ui/react"
import { Food } from "../../../domain/models/food"
import { useRemoveFood } from "../../hooks/useRemoveFood"
import { RemoveFoodButton } from "./RemoveFoodButton"

export interface FoodTableRowProps {
  food: Food
}

export function FoodTableRow({
  food
}: FoodTableRowProps) {
  const { removeFood, isRemoving } = useRemoveFood()
  return (
    <Tr>
      <Td>{food.name}</Td>
      <Td isNumeric>{food.expiresIn.toString()} </Td>
      <Td isNumeric>
        <RemoveFoodButton 
          isRemoving={isRemoving} 
          onRemove={() => removeFood(food)} />
      </Td>
    </Tr>
  )
}