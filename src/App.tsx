import {Suspense, useMemo, useState } from 'react'
import Header from '@/components/Header'
import SearchBar from '@/components/SearchBar'
import SortControls from '@/components/SortControls'
import ProductList from '@/components/ProductList'
import LoadingSpinner from '@/components/LoadingSpinner'

import { useDebounce } from '@/hooks/useDebounce'
import type { Product, ProductFormData, SortState } from '@/types/product'
import { useProducts } from './context/productContext'
import ProductForm from '@/components/ProductForm'
import ConfirmDialog from '@/components/ConfirmDialog'



export default function App() {
  const {products,addProduct,removeProduct} = useProducts()

  const [isFormOpen, setIsFormOpen] = useState(false)
  const [productToDelete, setProductToDelete] = useState<Product | null>(null)
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState<SortState>({ field: 'creacion', direction: 'desc' })
  

  const debouncedSearch = useDebounce(search, 200)

  const visibleProducts = useMemo(() => {
    const filtered = debouncedSearch.trim()
      ? products.filter((p) =>
          p.nombre.toLowerCase().includes(debouncedSearch.trim().toLowerCase())
        )
      : products

    const sorted = [...filtered].sort((a, b) => {
      let comparison = 0

      switch (sort.field) {
        case 'codigo':
          comparison = a.codigo - b.codigo
          break
        case 'cantidad':
          comparison = a.cantidad - b.cantidad
          break
        case 'creacion':
          comparison = new Date(a.creacion).getTime() - new Date(b.creacion).getTime()
          break
        case 'nombre':
          comparison = a.nombre.localeCompare(b.nombre, 'es', { sensitivity: 'base' })
          break
      }

      return sort.direction === 'asc' ? comparison : -comparison
    })

    return sorted
  }, [products, debouncedSearch, sort])


  const submitFormAddProduct = (data: ProductFormData): boolean => {
    const result = addProduct(data);
    if (result) {
      setIsFormOpen(false);
    }
    return result;
  };

  return (
    <div className="min-h-screen">
      <Header totalProducts={products.length} onNewProduct={() => setIsFormOpen(true)} />

      <main className="mx-auto max-w-5xl px-4 py-6 sm:px-6">
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <SearchBar value={search} onChange={setSearch} />
          <SortControls sort={sort} onChange={setSort} />
        </div>

        <ProductList
          products={visibleProducts}
          hasFilter={debouncedSearch.trim().length > 0}
          onDelete={setProductToDelete}
        />
      </main>

      {isFormOpen && (
        <Suspense fallback={<LoadingSpinner label="Cargando formulario…" />}>
          <ProductForm
            onClose={() => setIsFormOpen(false)}
            onSubmit={submitFormAddProduct}
          />
        </Suspense>
      )}

      {productToDelete && (
        <Suspense fallback={<LoadingSpinner label="Cargando…" />}>
          <ConfirmDialog
            productName={productToDelete.nombre}
            onCancel={() => setProductToDelete(null)}
            onConfirm={() => {
              removeProduct(productToDelete.id)
              setProductToDelete(null)
            }}
          />
        </Suspense>
      )}
    </div>
  )
}
