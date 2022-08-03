import { Button, ButtonGroup, Td, Tr } from "@chakra-ui/react"
import { useNavigate } from "react-router-dom"
import { Food } from "../../../domain/models/food"
import { useRemoveFood } from "../../hooks/useRemoveFood"
import { RemoveFoodButton } from "./RemoveFoodButton"

export interface FoodTableRowProps {
  food: Food
}

export function FoodTableRow({
  food
}: FoodTableRowProps) {
  const navigate = useNavigate()
  const { removeFood, isRemoving } = useRemoveFood()
  const handleClickOpen = () => {
    navigate(`/foods/${food.id}`)
  }

  return (
    <Tr>
      <Td>{food.name}</Td>
      <Td isNumeric>{food.expiresIn.toString()} </Td>
      <Td isNumeric>
        <ButtonGroup>
          <Button
            color={'blue'}
            borderColor={'blue'}
            size={'sm'}
            variant={'outline'}
            onClick={handleClickOpen}
          >
            Abrir
          </Button>

          <RemoveFoodButton 
            isRemoving={isRemoving} 
            onRemove={() => removeFood(food)} />
        </ButtonGroup>
      </Td>
    </Tr>
  )
}