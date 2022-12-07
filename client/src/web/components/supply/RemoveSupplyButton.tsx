import { CautionButton, CautionButtonProps } from '../layout'

interface Props extends Partial<CautionButtonProps> {
  isRemoving: boolean
  onRemove: () => void
}

export function RemoveSupplyButton({ isRemoving, onRemove, ...rest }: Props) {
  return (
    <CautionButton
      {...rest}
      cautionMessage="Você tem certeza que deseja remover este suprimento?"
      isLoading={isRemoving}
      onConfirm={onRemove}
    >
      Remover
    </CautionButton>
  )
}
