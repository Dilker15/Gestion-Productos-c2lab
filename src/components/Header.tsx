interface HeaderProps {
  totalProducts: number
  onNewProduct: () => void
}

export default function Header({ totalProducts, onNewProduct }: HeaderProps) {
  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-5xl flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div>
          <h1 className="text-xl font-bold text-slate-900 sm:text-2xl">
            Gestor de Productos
          </h1>
          <p className="text-sm text-slate-500">
            {totalProducts} {totalProducts === 1 ? 'producto registrado' : 'productos registrados'}
          </p>
        </div>

        <button
          type="button"
          onClick={onNewProduct}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-700 active:scale-[0.98] sm:w-auto"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
            <path d="M10 3a1 1 0 0 1 1 1v5h5a1 1 0 1 1 0 2h-5v5a1 1 0 1 1-2 0v-5H4a1 1 0 1 1 0-2h5V4a1 1 0 0 1 1-1Z" />
          </svg>
          Nuevo producto
        </button>
      </div>
    </header>
  )
}
