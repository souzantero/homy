import { ButtonGroup, Td, Tr } from "@chakra-ui/react"
import { Food } from "../../../domain/models/food"
import { useRemoveFood } from "../../hooks/useRemoveFood"
import { Authenticate } from "../auth/Authenticate"
import { NavButton } from "../button/NavButton"
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
        <ButtonGroup>
          <NavButton to={`/foods/${food.id}`}>
            Abrir
          </NavButton>
          <Authenticate>
            <RemoveFoodButton 
              isRemoving={isRemoving} 
              onRemove={() => removeFood(food)} />
          </Authenticate>
        </ButtonGroup>
      </Td>
    </Tr>
  )
}