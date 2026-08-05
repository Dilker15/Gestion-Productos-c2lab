# Gestor de Productos

Aplicación de gestión de productos construida con **React + TypeScript + Vite**, para la prueba técnica de Desarrollador Junior React / Next.

## Requisitos cubiertos

1. **Interfaz gráfica**: creación y visualización de productos en una lista.
2. **Estructura de producto**: `codigo`, `nombre`, `descripcion`, `cantidad`, `creacion` (autogenerada).
3. **Funciones mínimas**: crear, listar, eliminar, ordenar (por cantidad, creación, código y nombre, ascendente/descendente) y filtrar por nombre.
4. **Persistencia**: `localStorage`, sin backend.
5. **Manejo de estado**: **Zustand**.
6. **Buenas prácticas**: componentes reutilizables, carpetas separadas (`components`, `store`, `hooks`, `types`, `utils`), TypeScript en todo el proyecto.
7. **Extras implementados**: TailwindCSS, diseño responsivo (móvil/desktop) y optimización de carga con **lazy loading / dynamic imports**.
   - No incluidos (fuera de alcance de esta entrega): despliegue en Vercel/Netlify y tests con Jest/Testing Library.

## Instalación y ejecución local

Requisitos: Node.js 18+ y npm.

```bash
# 1. Instalar dependencias
npm install

# 2. Levantar el servidor de desarrollo
npm run dev
```

La app quedará disponible en `http://localhost:5173`.

Otros scripts disponibles:

```bash
npm run build     # build de producción (tsc + vite build) en /dist
npm run preview   # sirve la build de producción localmente
```

## Decisiones técnicas

- **Vite** como bundler: arranque en frío casi instantáneo y HMR rápido, ideal para una app de este tamaño frente a alternativas más pesadas.
- **Zustand** para el manejo de estado global de productos: API mínima (un solo hook `useProductStore`), sin el boilerplate de Redux ni el "provider hell" de anidar múltiples Contexts. Su middleware `persist` resuelve la persistencia en `localStorage` de forma declarativa (serializa/rehidrata automáticamente), evitando escribir manualmente `useEffect` + `JSON.stringify`/`JSON.parse` para sincronizar el store con el storage.
- **TailwindCSS** para los estilos: permite iterar rápido en la UI manteniendo todo el diseño responsivo (mobile-first) sin salir del JSX ni mantener archivos CSS separados por componente.
- **Lazy loading / dynamic imports**: `ProductForm` y `ConfirmDialog` se cargan con `React.lazy()` + `Suspense` solo cuando el usuario abre el modal correspondiente (crear o eliminar un producto). Esto reduce el bundle inicial — se puede comprobar en la salida de `npm run build`, donde ambos componentes aparecen como chunks independientes (`ProductForm-*.js`, `ConfirmDialog-*.js`) en lugar de formar parte del bundle principal. Además, `vite.config.ts` separa manualmente `react`/`react-dom` (`vendor`) y `zustand` (`state`) en sus propios chunks para aprovechar mejor el cache del navegador entre despliegues.
- **uuid** para generar el `id` interno de cada producto (usado como key de React y para el borrado), independiente del `codigo` que ingresa el usuario.
- **Debounce en la búsqueda** (`useDebounce`, 200ms): evita recalcular el filtrado/ordenamiento en cada tecla presionada.
- **Estructura de carpetas**:
  ```
  src/
    components/   # UI reutilizable (Header, ProductForm, ProductList, ProductItem, SearchBar, SortControls, Modal, etc.)
    store/        # Estado global (Zustand + persistencia)
    hooks/        # Hooks personalizados (useDebounce)
    types/        # Tipos de TypeScript compartidos
    utils/        # Utilidades puras (formateo de fechas)
  ```
- **Validación de formulario**: validación simple en el cliente (código y cantidad numéricos, nombre y descripción no vacíos) con mensajes de error accesibles (`aria-invalid`, `aria-describedby`).
- **Ordenamiento**: implementado en el cliente con `Array.prototype.sort`, memoizado con `useMemo` junto al filtrado para no recalcular en cada render.

## Notas de UI/UX

- Diseño completamente responsivo: en móvil los productos se muestran en una columna y el formulario aparece como hoja inferior (bottom sheet); en desktop se muestra en grilla de hasta 3 columnas y el formulario como modal centrado.
- Estado vacío diferenciado cuando no hay productos vs. cuando una búsqueda no arroja resultados.
- Indicador visual de stock bajo (≤ 5 unidades).
