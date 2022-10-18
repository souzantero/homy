import { useToast } from '@chakra-ui/react'
import { useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { Product } from '../../../../domain'
import {
  Products,
  useProducts,
  useRemoveProduct,
  useSignedUser
} from '../../../../web'
import { makeRemoveProductById } from '../../../factories'
import { useQueryProducts } from '../../../hooks'

export function ProductsPage() {
  const notify = useToast()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { products, isLoading } = useProducts({
    useData: () => useQueryProducts(),
    onNotify: notify
  })

  const { signedUser } = useSignedUser()
  const { isRemoving, removeProduct } = useRemoveProduct({
    makeRemoveProductById: () => makeRemoveProductById(signedUser!),
    onNotify: notify,
    onRemoved: () => {
      queryClient.invalidateQueries(['products'])
    }
  })

  return (
    <Products
      products={products}
      isLoading={isLoading}
      isRemoving={isRemoving}
      onAddNew={() => navigate('/manager/products/new')}
      onShowProduct={(product: Product) =>
        navigate(`/manager/products/${product.id}`)
      }
      onRemoveProduct={removeProduct}
    />
  )
}
