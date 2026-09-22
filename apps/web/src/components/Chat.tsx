import { useRef, useState } from "react";
import { Send } from "lucide-react";
import ReactMarkdown from "react-markdown";
import {
  Message,
  MessageBubble,
  MessageBubbleContent,
  MessageContent,
  MessageScroller,
  MessageTyping,
} from "@/components/agents/message";
import { Input } from "@/components/motion/input";
import { StatefulButton } from "@/components/motion/button/stateful";
import {
  AnimatedToastStack,
  useAnimatedToastStack,
} from "@/components/motion/animated-toast-stack";
import { postMessage } from "@/lib/api";
import { cn } from "@/lib/utils";

interface ChatMessage {
  id: string;
  from: "user" | "assistant";
  content: string;
}

export interface ChatProps {
  className?: string;
}

/** El chat en sí: historial + composer. Sin cabecera ni layout de página —
 * eso lo decide quien lo monta (App.tsx para el arnés de prueba de página
 * completa, ChatWidget.tsx para el panel flotante embebible). */
export function Chat({ className }: ChatProps) {
  const sessionId = useRef(crypto.randomUUID()).current;
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [sendState, setSendState] = useState<"idle" | "loading" | "error">("idle");
  const { toasts, showToast, dismissToast } = useAnimatedToastStack();

  async function handleSend() {
    const text = inputValue.trim();
    if (!text || sendState === "loading") return;

    setInputValue("");
    setMessages((current) => [
      ...current,
      { id: crypto.randomUUID(), from: "user", content: text },
    ]);
    setSendState("loading");

    try {
      const response = await postMessage(sessionId, text);
      setMessages((current) => [
        ...current,
        { id: crypto.randomUUID(), from: "assistant", content: response },
      ]);
      setSendState("idle");
    } catch (error) {
      setSendState("error");
      showToast({
        title: "No se pudo conectar con el backend",
        description: error instanceof Error ? error.message : String(error),
        status: "error",
      });
      window.setTimeout(() => setSendState("idle"), 1200);
    }
  }

  return (
    <div className={cn("flex min-h-0 flex-1 flex-col", className)}>
      <MessageScroller
        className="min-h-0 flex-1 rounded-2xl border border-border"
        viewportClassName="px-4"
        contentClassName="flex flex-col gap-4 py-4"
      >
        {messages.map((message) => (
          <Message key={message.id} from={message.from} animateIn>
            <MessageContent>
              <MessageBubble variant={message.from === "user" ? "tint" : "soft"} animateIn>
                <MessageBubbleContent>
                  {message.from === "assistant" ? (
                    <ReactMarkdown>{message.content}</ReactMarkdown>
                  ) : (
                    message.content
                  )}
                </MessageBubbleContent>
              </MessageBubble>
            </MessageContent>
          </Message>
        ))}

        {sendState === "loading" ? (
          <Message from="assistant">
            <MessageContent>
              <MessageBubble variant="soft">
                <MessageBubbleContent>
                  <MessageTyping label="Pensando..." />
                </MessageBubbleContent>
              </MessageBubble>
            </MessageContent>
          </Message>
        ) : null}
      </MessageScroller>

      <form
        className="flex shrink-0 items-end gap-2 py-4"
        onSubmit={(event) => {
          event.preventDefault();
          void handleSend();
        }}
      >
        <Input
          className="flex-1"
          value={inputValue}
          onChange={setInputValue}
          placeholder="Escribí tu mensaje..."
          autoComplete="off"
          disabled={sendState === "loading"}
        />
        <StatefulButton
          type="submit"
          size="lg"
          state={sendState}
          icon={<Send className="size-4" />}
          loadingText=""
          errorText="Error"
          disabled={!inputValue.trim() && sendState !== "loading"}
        >
          Enviar
        </StatefulButton>
      </form>

      <AnimatedToastStack toasts={toasts} onDismiss={dismissToast} position="bottom-center" />
    </div>
  );
}
