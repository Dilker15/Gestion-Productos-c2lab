import { formatDate } from '@/utils/formatDate'
import type { Product } from '@/types/product'

interface ProductItemProps {
  product: Product
  onDelete: (product: Product) => void
}

export default function ProductItem({ product, onDelete }: ProductItemProps) {
  const isLowStock = product.cantidad <= 5

  return (
    <li className="group animate-fade-in rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:shadow-md sm:p-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-md bg-brand-50 px-2 py-0.5 text-xs font-semibold text-brand-700">
              #{product.codigo}
            </span>
            <h3 className="truncate font-semibold text-slate-900">{product.nombre}</h3>
          </div>
          <p className="mt-1 line-clamp-2 text-sm text-slate-500">{product.descripcion}</p>

          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-400">
            <span>Creado: {formatDate(product.creacion)}</span>
          </div>
        </div>

        <div className="flex items-center gap-3 sm:flex-col sm:items-end">
          <span
            className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${
              isLowStock ? 'bg-amber-50 text-amber-700' : 'bg-emerald-50 text-emerald-700'
            }`}
          >
            {product.cantidad} en stock
          </span>

          <button
            type="button"
            onClick={() => onDelete(product)}
            aria-label={`Eliminar ${product.nombre}`}
            className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-sm font-medium text-red-600 opacity-100 transition hover:bg-red-50 sm:opacity-0 sm:group-hover:opacity-100"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
              <path
                fillRule="evenodd"
                d="M8.75 1A2.75 2.75 0 0 0 6 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 1 0 .23 1.482l.149-.022.841 10.518A2.75 2.75 0 0 0 7.596 19h4.807a2.75 2.75 0 0 0 2.742-2.53l.841-10.52.149.023a.75.75 0 0 0 .23-1.482 41.03 41.03 0 0 0-2.365-.298V3.75A2.75 2.75 0 0 0 11.25 1h-2.5ZM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4ZM8.58 7.72a.75.75 0 0 0-1.5.06l.3 7.5a.75.75 0 1 0 1.5-.06l-.3-7.5Zm4.34.06a.75.75 0 1 0-1.5-.06l-.3 7.5a.75.75 0 1 0 1.5.06l.3-7.5Z"
                clipRule="evenodd"
              />
            </svg>
            <span className="sm:hidden">Eliminarr</span>
          </button>
        </div>
      </div>
    </li>
  )
}
