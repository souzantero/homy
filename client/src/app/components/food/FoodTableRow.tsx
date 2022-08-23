import { ButtonGroup, Td, Tr } from '@chakra-ui/react'
import { Food } from '../../../domain/models/food'
import { useRemoveFood } from '../../hooks/useRemoveFood'
import { Signed } from '../auth/sign-in/Signed'
import { NavButton } from '../button/NavButton'
import { RemoveFoodButton } from './RemoveFoodButton'

export interface FoodTableRowProps {
  food: Food
}

export function FoodTableRow({ food }: FoodTableRowProps) {
  const { removeFood, isRemoving } = useRemoveFood()
  return (
    <Tr>
      <Td>{food.name}</Td>
      <Td isNumeric>{food.expiresIn.toString()} </Td>
      <Td isNumeric>
        <ButtonGroup>
          <NavButton to={`/foods/${food.id}`}>Abrir</NavButton>
          <Signed>
            <RemoveFoodButton
              isRemoving={isRemoving}
              onRemove={() => removeFood(food)}
            />
          </Signed>
        </ButtonGroup>
      </Td>
    </Tr>
  )
}
