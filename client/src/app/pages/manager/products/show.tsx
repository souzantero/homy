import { useToast } from '@chakra-ui/react'
import { useNavigate, useParams } from 'react-router-dom'
import { Product, useProduct } from '../../../../web'
import { useQueryProduct } from '../../../hooks'

export function ProductPage() {
  const notify = useToast()
  const navigate = useNavigate()
  const { productId } = useParams()
  const { isLoading, product } = useProduct({
    useData: () => useQueryProduct(productId!),
    onNotify: notify
  })

  return (
    <Product
      product={product!}
      isLoading={isLoading}
      onEdit={() => navigate(`/manager/products/${productId}/edit`)}
    />
  )
}
