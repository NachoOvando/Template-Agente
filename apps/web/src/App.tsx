import { Chat } from "@/components/Chat";

export default function App() {
  return (
    <div className="mx-auto flex h-svh max-w-2xl flex-col px-4">
      <header className="shrink-0 py-4">
        <h1 className="text-sm font-medium text-muted-foreground">
          Cata — arnés de prueba (no es el producto final)
        </h1>
      </header>

      <Chat />
    </div>
  );
}
