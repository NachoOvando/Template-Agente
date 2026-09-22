import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { MessageCircle, X } from "lucide-react";
import { Chat } from "@/components/Chat";
import { Button } from "@/components/motion/button/base";

/** Burbuja flotante + panel, para embeber en sitios de terceros (ver
 * widget-entry.tsx). El contenedor externo (montado fuera de React, en
 * widget-entry.tsx) ya cubre todo el viewport con `pointer-events: none` —
 * acá se reactivan los eventos solo en la burbuja y el panel, para no
 * bloquear clicks en el resto de la página host. */
export function ChatWidget() {
  const [open, setOpen] = useState(false);

  return (
    <div className="pointer-events-none absolute right-4 bottom-4 flex flex-col items-end gap-3">
      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 12 }}
            transition={{ type: "spring", stiffness: 420, damping: 34 }}
            className="pointer-events-auto flex h-[min(560px,calc(100svh-6rem))] w-[360px] max-w-[calc(100vw-2rem)] flex-col rounded-2xl border border-border bg-background p-3 shadow-2xl"
          >
            <div className="flex shrink-0 items-center justify-between pb-2">
              <span className="text-sm font-medium text-muted-foreground">
                Agent template
              </span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Cerrar chat"
                className="grid size-7 place-items-center rounded-full text-muted-foreground outline-none transition-colors hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
              >
                <X className="size-4" />
              </button>
            </div>
            <Chat />
          </motion.div>
        ) : null}
      </AnimatePresence>

      <Button
        type="button"
        size="icon"
        onClick={() => setOpen((current) => !current)}
        aria-label={open ? "Cerrar chat" : "Abrir chat"}
        className="pointer-events-auto size-14 rounded-full shadow-lg"
      >
        {open ? <X className="size-5" /> : <MessageCircle className="size-5" />}
      </Button>
    </div>
  );
}
