import { createRoot } from "react-dom/client";
import { ChatWidget } from "@/components/ChatWidget";
import { setApiBaseUrl } from "@/lib/api";
import widgetCss from "@/index.css?inline";

declare global {
  interface Window {
    __cataWidgetMounted?: boolean;
  }
}

function mount() {
  if (window.__cataWidgetMounted) return;
  window.__cataWidgetMounted = true;

  const scriptEl = document.currentScript as HTMLScriptElement | null;
  const apiBase = scriptEl?.dataset.apiBase;
  if (apiBase) setApiBaseUrl(apiBase);

  // Contenedor en el DOM del sitio host: cubre todo el viewport para poder
  // posicionar la burbuja/panel en una esquina fija, pero sin bloquear
  // clicks en el resto de la página (pointer-events se reactiva adentro,
  // solo en la burbuja y el panel — ver ChatWidget.tsx).
  const host = document.createElement("div");
  host.id = "cata-chat-widget";
  host.style.cssText = "position:fixed;inset:0;z-index:2147483000;pointer-events:none;";
  document.body.appendChild(host);

  // Shadow DOM: el CSS de Tailwind del widget no se filtra hacia el sitio
  // host, y el CSS del sitio host no le pisa los estilos al widget.
  //
  // `:root` (donde shadcn define --background, --foreground, etc.) nunca
  // matchea dentro de un shadow tree — solo matchea el <html> del documento
  // real. Sin este reemplazo, todas las custom properties de color quedan
  // sin definir y el panel se renderiza transparente. `:host` es el
  // selector correcto para "la raíz de este shadow tree".
  const shadowRoot = host.attachShadow({ mode: "open" });
  const style = document.createElement("style");
  style.textContent = widgetCss.replaceAll(":root", ":host");
  shadowRoot.appendChild(style);

  const mountPoint = document.createElement("div");
  shadowRoot.appendChild(mountPoint);

  createRoot(mountPoint).render(<ChatWidget />);
}

mount();
