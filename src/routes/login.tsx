import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { signInWithGooglePopup, supabase } from "@/lib/supabase";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Entrar — AprovadoIA" },
      { name: "description", content: "Acesse sua conta AprovadoIA." },
    ],
  }),
  component: LoginPage,
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

function LoginPage() {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!authLoading && user) {
      navigate({ to: "/dashboard" });
    }
  }, [authLoading, user, navigate]);

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { error } = await supabase.auth.signInWithPassword({
      email: form.email,
      password: form.password,
    });

    if (error) {
      setError("Email ou senha incorretos. Tente novamente.");
      setLoading(false);
    } else {
      setLoading(false);
      navigate({ to: "/dashboard" });
    }
  };

  const handleGoogleLogin = async () => {
    setGoogleLoading(true);
    setError("");

    try {
      await signInWithGooglePopup();
    } catch (_error) {
      setError("Erro ao entrar com Google. Tente novamente.");
      setGoogleLoading(false);
    }
  };

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

          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={googleLoading}
            className="mt-6 w-full inline-flex items-center justify-center gap-3 h-12 rounded-full border border-border bg-card hover:bg-muted transition-colors text-sm font-medium text-foreground disabled:opacity-60"
          >
            {googleLoading ? <Loader2 className="size-4 animate-spin" /> : <GoogleIcon />}
            Entrar com Google
          </button>

          <div className="my-6 flex items-center gap-3 text-xs text-muted-foreground">
            <div className="flex-1 h-px bg-border" />
            ou com email
            <div className="flex-1 h-px bg-border" />
          </div>

          <form onSubmit={handleEmailLogin} className="space-y-4">
            {error && (
              <div className="text-sm text-destructive bg-destructive/10 px-4 py-3 rounded-xl">
                {error}
              </div>
            )}
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
              disabled={loading}
              className="w-full h-12 rounded-full bg-success text-success-foreground font-medium hover:bg-success/90 transition-colors shadow-soft disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {loading && <Loader2 className="size-4 animate-spin" />}
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
