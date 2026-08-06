import { useState } from "react"



export function useForm<T>(initialValues: T) {
  const [form, setForm] = useState<T>(initialValues)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    setForm((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }))
  }

  const reset = () => {
    setForm(initialValues)
  }

  return {
    form,
    handleChange,
    setForm,
    reset,
  }
}