import { CautionButton, CautionButtonProps } from '../button/CautionButton'

export interface RemoveProductButtonProps extends Partial<CautionButtonProps> {
  isRemoving: boolean
  onRemove: () => void
}

export function RemoveProductButton({
  isRemoving,
  onRemove,
  ...rest
}: RemoveProductButtonProps) {
  return (
    <CautionButton
      {...rest}
      cautionMessage="Você tem certeza que deseja remover este produto?"
      isLoading={isRemoving}
      onConfirm={onRemove}
    >
      Remover
    </CautionButton>
  )
}
