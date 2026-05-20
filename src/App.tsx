import { type ChangeEvent, type FormEvent, useState } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/core";
import { Button } from "./components/Button/Button.tsx";

function App() {
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");

  async function greet() {
    setGreetMsg(await invoke("greet", { name }));
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen text-center p-4">
      <h1 className="text-4xl font-bold mb-8">DevLog</h1>

      <div className="flex justify-center gap-4 mb-8">
        <a
          href="https://vite.dev"
          target="_blank"
          className="hover:drop-shadow-[0_0_2em_#747bff] transition-[filter] duration-700"
        >
          <img src="/vite.svg" className="h-24 p-6" alt="Vite logo" />
        </a>
        <a
          href="https://tauri.app"
          target="_blank"
          className="hover:drop-shadow-[0_0_2em_#24c8db] transition-[filter] duration-700"
        >
          <img src="/tauri.svg" className="h-24 p-6" alt="Tauri logo" />
        </a>
        <a
          href="https://react.dev"
          target="_blank"
          className="hover:drop-shadow-[0_0_2em_#61dafb] transition-[filter] duration-700"
        >
          <img src={reactLogo} className="h-24 p-6" alt="React logo" />
        </a>
      </div>
      <p className="mb-8 text-muted-foreground">
        Click on the Tauri, Vite, and React logos to learn more.
      </p>

      <form
        className="flex justify-center items-center gap-2"
        onSubmit={(e: FormEvent) => {
          e.preventDefault();
          greet();
        }}
      >
        <input
          id="greet-input"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setName(e.currentTarget.value)}
          placeholder="Enter a name..."
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 max-w-[200px]"
        />
        <Button type="submit">Greet</Button>
      </form>

      <p className="mt-4 h-6 text-foreground">{greetMsg}</p>
    </main>
  );
}

export default App;
