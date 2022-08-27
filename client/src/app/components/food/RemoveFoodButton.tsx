import { CautionButton, CautionButtonProps } from '../button/CautionButton'
export interface RemoveFoodButtonProps extends Partial<CautionButtonProps> {
  isRemoving: boolean
  onRemove: () => void
}

export function RemoveFoodButton({
  isRemoving,
  onRemove,
  ...rest
}: RemoveFoodButtonProps) {
  return (
    <CautionButton
      {...rest}
      cautionMessage="Você tem certeza que deseja remover este alimento?"
      isLoading={isRemoving}
      onConfirm={onRemove}
    >
      Remover
    </CautionButton>
  )
}
