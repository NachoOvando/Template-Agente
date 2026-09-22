// Arnés de prueba end-to-end para el backend de Cata. Sin build step, sin
// framework — el objetivo es poder probar el agente desde el navegador, no
// una UI productiva.

const API_BASE_URL = "http://localhost:8000";
const sessionId = crypto.randomUUID();

const historyEl = document.getElementById("history");
const formEl = document.getElementById("form");
const inputEl = document.getElementById("input");

function appendMessage(role, content) {
  const msg = document.createElement("div");
  msg.className = `msg ${role}`;
  const bubble = document.createElement("span");
  bubble.className = "bubble";
  bubble.textContent = content;
  msg.appendChild(bubble);
  historyEl.appendChild(msg);
  historyEl.scrollTop = historyEl.scrollHeight;
}

async function sendMessage(message) {
  const response = await fetch(`${API_BASE_URL}/messages`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ session_id: sessionId, message }),
  });

  if (!response.ok) {
    throw new Error(`El backend respondió ${response.status}`);
  }

  const data = await response.json();
  return data.response;
}

formEl.addEventListener("submit", async (event) => {
  event.preventDefault();
  const message = inputEl.value.trim();
  if (!message) return;

  inputEl.value = "";
  inputEl.disabled = true;
  appendMessage("user", message);

  try {
    const response = await sendMessage(message);
    appendMessage("assistant", response);
  } catch (error) {
    appendMessage("assistant", `Error hablando con el backend: ${error.message}`);
  } finally {
    inputEl.disabled = false;
    inputEl.focus();
  }
});
