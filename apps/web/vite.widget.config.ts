import path from "node:path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// Build separado del widget embebible: un único archivo IIFE autocontenido
// (React incluido) que un sitio de terceros carga con un <script src="...">.
// No comparte output con la SPA de apps/web (vite.config.ts) porque esa
// emite un index.html + assets con nombres hasheados pensados para servirse
// como página propia, no para embeberse en el DOM de otro sitio.
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "./src"),
    },
  },
  // El build de la SPA (vite.config.ts) reemplaza process.env.NODE_ENV
  // automáticamente en modo app. El modo lib no lo hace, y React lo lee en
  // runtime — sin esto, el widget tira "process is not defined" apenas
  // carga en el sitio host.
  define: {
    "process.env.NODE_ENV": JSON.stringify("production"),
  },
  publicDir: false,
  build: {
    outDir: "dist-widget",
    emptyOutDir: true,
    cssCodeSplit: false,
    lib: {
      entry: path.resolve(import.meta.dirname, "src/widget-entry.tsx"),
      name: "CataWidget",
      formats: ["iife"],
      fileName: () => "widget.js",
    },
  },
})
