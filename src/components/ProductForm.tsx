import { useState, type FormEvent } from 'react'
import Modal from '@/components/Modal'
import type {ProductFormData } from '@/types/product'
import { useForm } from '@/hooks/useForm'

interface ProductFormProps {
  onSubmit: (data: ProductFormData) => boolean
  onClose: () => void
}

interface FormErrors {
  codigo?: string
  nombre?: string
  descripcion?: string
  cantidad?: string
}

export interface ProductForm {
  codigo: string;
  nombre: string;
  descripcion: string;
  cantidad: string;
}

export default function ProductForm({ onSubmit, onClose }: ProductFormProps) {
  const { form, handleChange,reset } = useForm<ProductForm>({
                                      cantidad:"",
                                      codigo:"",
                                      descripcion:"",
                                      nombre:""});
  const [errors, setErrors] = useState<FormErrors>({})

  const validate = (): boolean => {
    const next: FormErrors = {}

    if (form.codigo.toString().trim() === '' || Number.isNaN(form.codigo)) {
      next.codigo = 'Ingresa un código numérico válido.'
    }
    if (form.nombre.trim().length < 2) {
      next.nombre = 'El nombre debe tener al menos 2 caracteres.'
    }
    if (form.descripcion.trim().length === 0) {
      next.descripcion = 'La descripción es obligatoria.'
    }
    if (form.cantidad.toString().trim() === '' || Number.isNaN(form.cantidad) || Number(form.cantidad )< 0) {
      next.cantidad = 'Ingresa una cantidad numérica válida (0 o más).'
    }

    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    const created = onSubmit({
      codigo: Number(form.codigo),
      nombre: form.nombre.trim(),
      descripcion: form.descripcion.trim(),
      cantidad: Number(form.cantidad),
    })
    
    if (!created) {
      setErrors((prev) => ({
        ...prev,
        codigo: "Ya existe un producto con ese código.",
      }))
      return;
    }
    reset();
  }

  return (
    <Modal title="Nuevo producto" onClose={onClose}>
      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        <div>
          <label htmlFor="codigo" className="mb-1 block text-sm font-medium text-slate-700">
            Código
          </label>
          <input
            id="codigo"
            name="codigo"
            type="number"
            inputMode="numeric"
            value={form.codigo}
            onChange={(e) => {handleChange(e);
              if (errors.codigo) {
                setErrors((prev) => ({
                  ...prev,
                  codigo: undefined,
                }));
              }
            }}
            aria-invalid={Boolean(errors.codigo)}
            aria-describedby={errors.codigo ? 'codigo-error' : undefined}
            className={`w-full rounded-lg border px-3 py-2.5 text-sm shadow-sm outline-none transition focus:ring-2 ${
              errors.codigo
                ? 'border-red-300 focus:border-red-500 focus:ring-red-100'
                : 'border-slate-300 focus:border-brand-500 focus:ring-brand-100'
            }`}
            placeholder="Ej: 1001"
          />
          {errors.codigo && (
            <p id="codigo-error" className="mt-1 text-xs text-red-600">
              {errors.codigo}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="nombre" className="mb-1 block text-sm font-medium text-slate-700">
            Nombre
          </label>
          <input
            id="nombre"
            name="nombre"
            type="text"
            value={form.nombre}
            onChange={(e) => handleChange(e)}
            aria-invalid={Boolean(errors.nombre)}
            aria-describedby={errors.nombre ? 'nombre-error' : undefined}
            className={`w-full rounded-lg border px-3 py-2.5 text-sm shadow-sm outline-none transition focus:ring-2 ${
              errors.nombre
                ? 'border-red-300 focus:border-red-500 focus:ring-red-100'
                : 'border-slate-300 focus:border-brand-500 focus:ring-brand-100'
            }`}
            placeholder="Ej: Teclado mecánico"
          />
          {errors.nombre && (
            <p id="nombre-error" className="mt-1 text-xs text-red-600">
              {errors.nombre}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="descripcion" className="mb-1 block text-sm font-medium text-slate-700">
            Descripción
          </label>
          <textarea
            id="descripcion"
            name="descripcion"
            value={form.descripcion}
            onChange={(e) => handleChange(e)}
            aria-invalid={Boolean(errors.descripcion)}
            aria-describedby={errors.descripcion ? 'descripcion-error' : undefined}
            rows={3}
            className={`w-full resize-none rounded-lg border px-3 py-2.5 text-sm shadow-sm outline-none transition focus:ring-2 ${
              errors.descripcion
                ? 'border-red-300 focus:border-red-500 focus:ring-red-100'
                : 'border-slate-300 focus:border-brand-500 focus:ring-brand-100'
            }`}
            placeholder="Breve descripción del producto"
          />
          {errors.descripcion && (
            <p id="descripcion-error" className="mt-1 text-xs text-red-600">
              {errors.descripcion}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="cantidad" className="mb-1 block text-sm font-medium text-slate-700">
            Cantidad
          </label>
          <input
            id="cantidad"
            name="cantidad"
            type="number"
            inputMode="numeric"
            min={0}
            value={form.cantidad}
            onChange={(e) => handleChange(e)}
            aria-invalid={Boolean(errors.cantidad)}
            aria-describedby={errors.cantidad ? 'cantidad-error' : undefined}
            className={`w-full rounded-lg border px-3 py-2.5 text-sm shadow-sm outline-none transition focus:ring-2 ${
              errors.cantidad
                ? 'border-red-300 focus:border-red-500 focus:ring-red-100'
                : 'border-slate-300 focus:border-brand-500 focus:ring-brand-100'
            }`}
            placeholder="Ej: 25"
          />
          {errors.cantidad && (
            <p id="cantidad-error" className="mt-1 text-xs text-red-600">
              {errors.cantidad}
            </p>
          )}
        </div>

        <div className="flex justify-end gap-2 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg px-4 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-100"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-700 active:scale-[0.98]"
          >
            Guardar producto
          </button>
        </div>
      </form>
    </Modal>
  )
}
