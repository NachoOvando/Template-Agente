# apps/web — Cata (arnés de prueba)

Frontend de prueba end-to-end para el backend de Cata. No es un producto —
sin sidebar, sin navegación, sin persistencia más allá de la sesión del
navegador. Ver `CLAUDE.md` en la raíz del repo.

## Stack

React + Vite + Tailwind CSS 4. Componentes de [beUI](https://beui.dev)
(`message`, `input`, `button-stateful`, `animated-toast-stack`) instalados
vía shadcn en `src/components/`.

## Correr

```bash
cp .env.example .env   # VITE_API_BASE_URL, default http://localhost:8000
npm install
npm run dev
```

Requiere el backend (`apps/api`) corriendo — ver el README/CLAUDE.md de la raíz.

## Agregar otro componente de beUI

```bash
npx shadcn@latest add @beui/<nombre-del-componente>
```
