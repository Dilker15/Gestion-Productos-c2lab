import ProductItem from '@/components/ProductItem'
import EmptyState from '@/components/EmptyState'
import type { Product } from '@/types/product'

interface ProductListProps {
  products: Product[]
  hasFilter: boolean
  onDelete: (product: Product) => void
}

export default function ProductList({ products, hasFilter, onDelete }: ProductListProps) {
  if (products.length === 0) {
    return <EmptyState hasFilter={hasFilter} />
  }

  return (
    <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <ProductItem key={product.id} product={product} onDelete={onDelete} />
      ))}
    </ul>
  )
}
