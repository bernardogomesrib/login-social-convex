"use client";
import { useAuthActions } from "@convex-dev/auth/react";
import { useState } from "react";
import { toast } from "sonner";
import { GitLogin } from "./GitHubButton";

export function SignInForm() {
  const { signIn, } = useAuthActions();
  const [flow, setFlow] = useState<"signIn" | "signUp">("signIn");
  const [submitting, setSubmitting] = useState(false);

  return (
    <div className="h-full w-full">
      <form className="flex flex-col gap-4"
        onSubmit={async (e) => {
          e.preventDefault();
          setSubmitting(true);
          const formData = new FormData(e.target as HTMLFormElement);
          formData.set("flow", flow);
          try {
            await signIn("password", formData);
          } catch (error) {
            const fullMessage = (error as Error).message || "An unknown error occurred";
            // Extrai apenas a primeira linha da mensagem de erro
            const errorMessage = fullMessage.split("\n")[1].split("Uncaught Error: ")[1] || fullMessage.split("\n")[0];
            toast.error(errorMessage.trim()); // Exibe apenas a mensagem principal
            console.error("Error details:", error); // Loga o erro completo no console
          } finally {
            setSubmitting(false);
          }
        }}
      >
        <input
          className="input-field"
          type="email"
          name="email"
          placeholder="Email"
          required
        />
        <input
          className="input-field"
          type="password"
          name="password"
          placeholder="Password"
          required
        />
        <button className="auth-button" type="submit" disabled={submitting}>
          {flow === "signIn" ? "Sign in" : "Sign up"}
        </button>
        <div className="text-center text-sm text-slate-600">
          <span>
            {flow === "signIn"
              ? "Don't have an account? "
              : "Already have an account? "}
          </span>
          <button
            type="button"
            className="text-blue-500 cursor-pointer"
            onClick={() => setFlow(flow === "signIn" ? "signUp" : "signIn")}
          >
            {flow === "signIn" ? "Sign up instead" : "Sign in instead"}
          </button>
        </div>
      </form>
      <div className="flex items-center justify-center my-3">
        <hr className="my-4 grow" />
        <span className="mx-4 text-slate-400 ">or</span>
        <hr className="my-4 grow" />
      </div>
      <GitLogin />
    </div>
  );
}