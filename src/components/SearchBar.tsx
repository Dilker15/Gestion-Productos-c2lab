interface SearchBarProps {
  value: string
  onChange: (value: string) => void
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="relative w-full sm:max-w-xs">
      <label htmlFor="search-products" className="sr-only">
        Buscar producto por nombre
      </label>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
        aria-hidden="true"
      >
        <path
          fillRule="evenodd"
          d="M9 3.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11ZM2 9a7 7 0 1 1 12.452 4.391l3.328 3.329a.75.75 0 1 1-1.06 1.06l-3.329-3.328A7 7 0 0 1 2 9Z"
          clipRule="evenodd"
        />
      </svg>
      <input
        id="search-products"
        type="search"
        inputMode="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Buscar por nombre…"
        className="w-full rounded-lg border border-slate-300 bg-white py-2.5 pl-9 pr-3 text-sm text-slate-800 shadow-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
      />
    </div>
  )
}
