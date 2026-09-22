let apiBaseUrl = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8000";

/** El build de la página de prueba fija la URL vía VITE_API_BASE_URL en build
 * time. El widget embebido es el mismo bundle en cualquier sitio host, así
 * que necesita poder configurarla en runtime — ver widget-entry.tsx. */
export function setApiBaseUrl(url: string) {
  apiBaseUrl = url;
}

export async function postMessage(sessionId: string, message: string): Promise<string> {
  const response = await fetch(`${apiBaseUrl}/messages`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ session_id: sessionId, message }),
  });

  if (!response.ok) {
    throw new Error(`El backend respondió ${response.status}`);
  }

  const data: { session_id: string; response: string } = await response.json();
  return data.response;
}
