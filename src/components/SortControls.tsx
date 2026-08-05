import type { SortDirection, SortField, SortState } from '@/types/product'

interface SortControlsProps {
  sort: SortState
  onChange: (sort: SortState) => void
}

const FIELD_LABELS: Record<SortField, string> = {
  codigo: 'Código',
  nombre: 'Nombre',
  cantidad: 'Cantidad',
  creacion: 'Creación',
}

export default function SortControls({ sort, onChange }: SortControlsProps) {
  const handleFieldChange = (field: SortField) => {
    onChange({ ...sort, field })
  }

  const toggleDirection = () => {
    const direction: SortDirection = sort.direction === 'asc' ? 'desc' : 'asc'
    onChange({ ...sort, direction })
  }

  return (
    <div className="flex items-center gap-2">
      <label htmlFor="sort-field" className="sr-only">
        Ordenar por
      </label>
      <select
        id="sort-field"
        value={sort.field}
        onChange={(e) => handleFieldChange(e.target.value as SortField)}
        className="rounded-lg border border-slate-300 bg-white py-2.5 pl-3 pr-8 text-sm text-slate-700 shadow-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
      >
        {(Object.keys(FIELD_LABELS) as SortField[]).map((field) => (
          <option key={field} value={field}>
            Ordenar por {FIELD_LABELS[field]}
          </option>
        ))}
      </select>

      <button
        type="button"
        onClick={toggleDirection}
        aria-label={sort.direction === 'asc' ? 'Orden ascendente' : 'Orden descendente'}
        title={sort.direction === 'asc' ? 'Ascendente' : 'Descendente'}
        className="inline-flex h-[42px] w-[42px] flex-shrink-0 items-center justify-center rounded-lg border border-slate-300 bg-white text-slate-600 shadow-sm transition hover:bg-slate-50 active:scale-95"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className={`h-4 w-4 transition-transform ${sort.direction === 'desc' ? 'rotate-180' : ''}`}
        >
          <path
            fillRule="evenodd"
            d="M10 3a.75.75 0 0 1 .75.75v10.638l3.96-4.158a.75.75 0 1 1 1.08 1.04l-5.25 5.5a.75.75 0 0 1-1.08 0l-5.25-5.5a.75.75 0 1 1 1.08-1.04l3.96 4.158V3.75A.75.75 0 0 1 10 3Z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </div>
  )
}
