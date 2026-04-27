import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";

export const Route = createFileRoute("/signup")({
  head: () => ({
    meta: [
      { title: "Criar conta — AprovadoIA" },
      { name: "description", content: "Crie sua conta grátis na AprovadoIA." },
    ],
  }),
  component: SignupPage,
});

function GoogleIcon() {
  return (
    <svg viewBox="0 0 48 48" className="size-5">
      <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.6-6 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.5 29.3 4.5 24 4.5 13.2 4.5 4.5 13.2 4.5 24S13.2 43.5 24 43.5 43.5 34.8 43.5 24c0-1.2-.1-2.4-.4-3.5z"/>
      <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.2 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.5 29.3 4.5 24 4.5 16.3 4.5 9.6 8.8 6.3 14.7z"/>
      <path fill="#4CAF50" d="M24 43.5c5.2 0 9.9-2 13.4-5.2l-6.2-5.2c-2 1.4-4.5 2.4-7.2 2.4-5.3 0-9.7-3.4-11.3-8l-6.5 5C9.5 39 16.2 43.5 24 43.5z"/>
      <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.1-4 5.6l6.2 5.2c-.4.4 6.5-4.7 6.5-14.8 0-1.2-.1-2.4-.4-3.5z"/>
    </svg>
  );
}

function SignupPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password.length < 8) {
      setError("A senha deve ter pelo menos 8 caracteres.");
      return;
    }
    setLoading(true);
    setError("");
    setSuccess("");

    const { data, error } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: {
        data: { full_name: form.name },
        emailRedirectTo: `${window.location.origin}/dashboard`,
      },
    });

    if (error) {
      setError(error.message === "User already registered"
        ? "Este email já está cadastrado. Faça login."
        : "Erro ao criar conta. Tente novamente.");
      setLoading(false);
    } else if (data.session) {
      // Confirmação de email desligada — login automático
      navigate({ to: "/dashboard" });
    } else {
      // Confirmação de email ativada
      setSuccess("Conta criada! Confira seu email para confirmar o cadastro antes de entrar.");
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    setGoogleLoading(true);
    setError("");

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/dashboard`,
      },
    });

    if (error) {
      setError("Erro ao entrar com Google. Tente novamente.");
      setGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-dvh grid lg:grid-cols-2 bg-background">
      <div className="flex flex-col px-6 sm:px-12 lg:px-16 py-10">
        <Link to="/" className="flex items-center gap-2 mb-12">
          <div className="size-7 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-display font-semibold text-sm">A</span>
          </div>
          <span className="font-display font-semibold text-primary text-xl">AprovadoIA</span>
        </Link>

        <div className="max-w-md w-full mx-auto flex-1 flex flex-col justify-center">
          <h1 className="font-display text-3xl lg:text-4xl font-semibold text-primary tracking-tight">
            Crie sua conta grátis
          </h1>
          <p className="mt-3 text-muted-foreground">
            Em 30 segundos você recebe seu primeiro cronograma.
          </p>

          <button
            type="button"
            onClick={handleGoogleSignup}
            disabled={googleLoading}
            className="mt-8 inline-flex items-center justify-center gap-3 h-12 rounded-full border border-border bg-card hover:bg-muted transition-colors text-sm font-medium text-foreground disabled:opacity-60"
          >
            {googleLoading ? <Loader2 className="size-4 animate-spin" /> : <GoogleIcon />}
            Continuar com Google
          </button>

          <div className="my-7 flex items-center gap-3 text-xs text-muted-foreground">
            <div className="flex-1 h-px bg-border" />
            ou com email
            <div className="flex-1 h-px bg-border" />
          </div>

          <form onSubmit={handleSignup} className="space-y-4">
            {error && (
              <div className="text-sm text-destructive bg-destructive/10 px-4 py-3 rounded-xl">
                {error}
              </div>
            )}
            {success && (
              <div className="text-sm text-success bg-success/10 px-4 py-3 rounded-xl">
                {success}
              </div>
            )}
            <div>
              <label className="text-xs font-medium text-primary uppercase tracking-wider">Nome completo</label>
              <input
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="mt-2 w-full h-12 rounded-xl border border-input bg-card px-4 text-sm focus:outline-none focus:ring-2 focus:ring-success/40"
                placeholder="Maria Silva"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-primary uppercase tracking-wider">Email</label>
              <input
                required
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="mt-2 w-full h-12 rounded-xl border border-input bg-card px-4 text-sm focus:outline-none focus:ring-2 focus:ring-success/40"
                placeholder="voce@email.com"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-primary uppercase tracking-wider">Senha</label>
              <input
                required
                type="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="mt-2 w-full h-12 rounded-xl border border-input bg-card px-4 text-sm focus:outline-none focus:ring-2 focus:ring-success/40"
                placeholder="Mínimo 8 caracteres"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex items-center justify-center gap-2 h-14 rounded-full bg-success text-success-foreground font-medium hover:bg-success/90 transition-colors shadow-soft disabled:opacity-60"
            >
              {loading ? <Loader2 className="size-4 animate-spin" /> : <ArrowRight className="size-4" />}
              Criar conta grátis
            </button>
          </form>

          <p className="mt-6 text-sm text-muted-foreground text-center">
            Já tem conta?{" "}
            <Link to="/login" className="text-primary font-medium hover:underline">
              Entrar
            </Link>
          </p>
        </div>
      </div>

      <div className="hidden lg:flex relative bg-primary text-primary-foreground items-center justify-center p-16 overflow-hidden">
        <div className="absolute top-0 right-0 size-[500px] bg-success/20 blur-[120px] rounded-full" />
        <div className="relative max-w-md">
          <div className="text-xs font-semibold uppercase tracking-widest text-success mb-6">✦ Acesso instantâneo</div>
          <h2 className="font-display text-4xl font-semibold leading-tight">
            "A IA me deu clareza do que estudar todo dia. Aprovada em 8 meses."
          </h2>
          <div className="mt-8 flex items-center gap-3">
            <div className="size-12 rounded-full bg-success-soft" />
            <div>
              <div className="font-medium">Mariana Costa</div>
              <div className="text-sm text-primary-foreground/70">Receita Federal 2024</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
