import { Authenticated, Unauthenticated, useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import { SignInForm } from "./SignInForm";
import { SignOutButton } from "./SignOutButton";
import { Toaster } from "sonner";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-sm p-4 flex justify-between items-center border-b">
        <h2 className="text-xl font-semibold accent-text">Chef</h2>
        <SignOutButton />
      </header>
      <main className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md mx-auto">
          <Content />
        </div>
      </main>
      <Toaster />
    </div>
  );
}

function Content() {
  const loggedInUser = useQuery(api.auth.loggedInUser);

  if (loggedInUser === undefined) {
    return (
      <div className="flex justify-center items-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      <Authenticated>
        {/* Conteúdo para usuários logados */}
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Bem-vindo!</h1>
          <p className="text-xl text-slate-600">
            Olá, {loggedInUser?.name || loggedInUser?.email || "usuário"}!
          </p>
          {/* Adicione aqui o conteúdo que só usuários logados podem ver */}
          <div className="mt-8 p-4 bg-white rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Área do Usuário</h2>
            <p>Este é seu conteúdo exclusivo.</p>
          </div>
        </div>
      </Authenticated>

      <Unauthenticated>
        {/* Conteúdo para usuários não logados */}
        <div className="text-center">
          <h1 className="text-5xl font-bold accent-text mb-4">Bem-vindo ao App</h1>
          <p className="text-xl text-slate-600 mb-8">Faça login para começar</p>
          <SignInForm />
        </div>
      </Unauthenticated>
    </div>
  );
}
