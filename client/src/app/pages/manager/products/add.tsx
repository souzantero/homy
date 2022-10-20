import { useToast } from '@chakra-ui/react'
import { useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { Product } from '../../../../domain'
import { AddProduct, useAddProduct } from '../../../../web'
import { makeAddProduct } from '../../../factories'
import { useSignedUser } from '../../../hooks'

export function AddProductPage() {
  const notify = useToast()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { signedUser } = useSignedUser()

  const add = makeAddProduct(signedUser!)
  const { name, isAdding, setName, addProduct } = useAddProduct({
    action: add,
    onAdded: (product: Product) => {
      queryClient.invalidateQueries(['products'])
      navigate('/manager/products')
    },
    onNotify: notify
  })

  return (
    <AddProduct
      name={name}
      isAdding={isAdding}
      onChangeName={setName}
      onAdd={addProduct}
    />
  )
}
