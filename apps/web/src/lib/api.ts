const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8000";

export async function postMessage(sessionId: string, message: string): Promise<string> {
  const response = await fetch(`${API_BASE_URL}/messages`, {
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
