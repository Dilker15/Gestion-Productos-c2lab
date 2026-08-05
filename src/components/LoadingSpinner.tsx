interface LoadingSpinnerProps {
  label?: string
}

export default function LoadingSpinner({ label = 'Cargando…' }: LoadingSpinnerProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex items-center justify-center gap-3 py-10 text-slate-500"
    >
      <span className="h-5 w-5 animate-spin rounded-full border-2 border-brand-300 border-t-brand-600" />
      <span className="text-sm">{label}</span>
    </div>
  )
}
