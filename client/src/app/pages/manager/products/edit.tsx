import { useToast } from '@chakra-ui/react'
import { useQueryClient } from '@tanstack/react-query'
import { useNavigate, useParams } from 'react-router-dom'
import { EditProduct, useUpdateProduct } from '../../../../web'
import { makeUpdateProductById } from '../../../factories'
import { useProductById, useSignedUser } from '../../../hooks'

export function EditProductPage() {
  const notify = useToast()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { productId } = useParams()
  const { signedUser } = useSignedUser()
  const updateProductById = makeUpdateProductById(signedUser!)
  const { name, setName, isLoading, updateProduct, isUpdating } =
    useUpdateProduct(productId || '', {
      updateProductById,
      useProduct: () => useProductById(productId!),
      onUpdated: (product) => {
        queryClient.invalidateQueries(['products'])
        navigate('/manager/products')
      },
      onNotify: notify
    })

  return (
    <EditProduct
      name={name}
      isLoading={isLoading}
      isUpdating={isUpdating}
      onChangeName={setName}
      onUpdate={updateProduct}
    />
  )
}
