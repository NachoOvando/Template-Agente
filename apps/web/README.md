# apps/web — Agent template (arnés de prueba)

Frontend de prueba end-to-end para el backend del agente. No es un producto —
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

## Widget embebible

```bash
npm run build:widget   # dist-widget/widget.js
```

Un sitio de terceros lo carga con:

```html
<script src="https://tu-dominio/widget.js" data-api-base="https://tu-api"></script>
```

Ver la sección "Widget embebible" en el `CLAUDE.md` de la raíz para el detalle
de aislamiento (Shadow DOM) y configuración del backend (CORS, rate limiting).
