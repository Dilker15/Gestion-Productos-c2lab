import Modal from '@/components/Modal'

interface ConfirmDialogProps {
  productName: string
  onConfirm: () => void
  onCancel: () => void
}


export default function ConfirmDialog({ productName, onConfirm, onCancel }: ConfirmDialogProps) {
  return (
    <Modal title="Eliminar producto" onClose={onCancel}>
      <p className="text-sm text-slate-600">
        ¿Seguro que quieres eliminar <span className="font-semibold text-slate-900">{productName}</span>?
        Esta acción no se puede deshacer.
      </p>
      <div className="mt-5 flex justify-end gap-2">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-lg px-4 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-100"
        >
          Cancelar
        </button>
        <button
          type="button"
          onClick={onConfirm}
          className="rounded-lg bg-red-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-red-700 active:scale-[0.98]"
        >
          Eliminar
        </button>
      </div>
    </Modal>
  )
}
