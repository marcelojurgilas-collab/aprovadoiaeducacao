import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Entrar — AprovadoIA" },
      { name: "description", content: "Acesse sua conta AprovadoIA." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });

  return (
    <div className="min-h-dvh flex items-center justify-center bg-background px-6 py-12">
      <div className="w-full max-w-md">
        <Link to="/" className="flex items-center gap-2 justify-center mb-10">
          <div className="size-7 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-display font-semibold text-sm">A</span>
          </div>
          <span className="font-display font-semibold text-primary text-xl">AprovadoIA</span>
        </Link>

        <div className="bg-card border border-border/60 rounded-3xl p-8 shadow-card">
          <h1 className="font-display text-2xl font-semibold text-primary text-center">
            Bem-vindo de volta
          </h1>
          <p className="text-sm text-muted-foreground text-center mt-2">
            Continue de onde parou.
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              navigate({ to: "/dashboard" });
            }}
            className="space-y-4 mt-8"
          >
            <input
              required
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full h-12 rounded-xl border border-input bg-background px-4 text-sm focus:outline-none focus:ring-2 focus:ring-success/40"
              placeholder="Email"
            />
            <input
              required
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full h-12 rounded-xl border border-input bg-background px-4 text-sm focus:outline-none focus:ring-2 focus:ring-success/40"
              placeholder="Senha"
            />
            <button
              type="submit"
              className="w-full h-12 rounded-full bg-success text-success-foreground font-medium hover:bg-success/90 transition-colors shadow-soft"
            >
              Entrar
            </button>
          </form>

          <p className="mt-6 text-sm text-muted-foreground text-center">
            Não tem conta?{" "}
            <Link to="/signup" className="text-primary font-medium hover:underline">
              Criar conta grátis
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
