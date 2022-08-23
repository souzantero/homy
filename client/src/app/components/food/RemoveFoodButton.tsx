import { CautionButton } from '../button/CautionButton'
export interface RemoveFoodButtonProps {
  isRemoving: boolean
  onRemove: () => void
}

export function RemoveFoodButton({
  isRemoving,
  onRemove
}: RemoveFoodButtonProps) {
  return (
    <CautionButton
      cautionMessage="Você tem certeza que deseja remover este alimento?"
      isLoading={isRemoving}
      onConfirm={onRemove}
    >
      Remover
    </CautionButton>
  )
}
