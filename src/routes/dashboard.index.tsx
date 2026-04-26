import { createFileRoute, Link } from "@tanstack/react-router";
import { Flame, Target, CalendarDays, HelpCircle, PenLine, BarChart3, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

export const Route = createFileRoute("/dashboard/")({
  component: DashboardHome,
});

const shortcuts = [
  { to: "/dashboard/concurso", label: "Meu Concurso", icon: Target, color: "bg-blue-100 text-blue-700" },
  { to: "/dashboard/cronograma", label: "Cronograma", icon: CalendarDays, color: "bg-success-soft text-success" },
  { to: "/dashboard/questoes", label: "Questões", icon: HelpCircle, color: "bg-amber-100 text-amber-700" },
  { to: "/dashboard/redacao", label: "Redação", icon: PenLine, color: "bg-rose-100 text-rose-700" },
] as const;

function DashboardHome() {
  const [userName, setUserName] = useState("Estudante");

  useEffect(() => {
    async function carregarUsuario() {
      // Pega o usuário logado no momento
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        // Pega o nome completo do Google ou do cadastro manual
        const nomeCompleto = user.user_metadata?.full_name || user.user_metadata?.name || "Estudante";
        // Separa para pegar só o primeiro nome
        const primeiroNome = nomeCompleto.split(" ")[0];
        setUserName(primeiroNome);
      }
    }
    
    carregarUsuario();
  }, []);

  return (
    <div className="p-6 lg:p-12 max-w-6xl mx-auto">
      {/* Welcome */}
      <div className="bg-primary text-primary-foreground rounded-3xl p-8 lg:p-10 relative overflow-hidden">
        <div className="absolute top-0 right-0 size-[400px] bg-success/30 blur-[120px] rounded-full" />
        <div className="relative">
          <p className="text-sm text-primary-foreground/70">Olá, {userName} 👋</p>
          <h1 className="font-display text-3xl lg:text-4xl font-semibold mt-2 tracking-tight">
            Você tem <span className="text-success">187 dias</span> até a sua prova.
          </h1>
          <p className="mt-3 text-primary-foreground/80 max-w-xl">
            Receita Federal — Auditor Fiscal. Você está no caminho certo.
          </p>

          <div className="mt-8">
            <div className="flex justify-between text-xs mb-2">
              <span className="text-primary-foreground/70 uppercase tracking-wider font-medium">
                Cronograma da semana
              </span>
              <span className="font-medium tabular-nums">68%</span>
            </div>
            <div className="h-2 bg-primary-foreground/10 rounded-full overflow-hidden">
              <div className="h-full bg-success w-[68%] rounded-full" />
            </div>
          </div>
        </div>
      </div>

      {/* Cards row */}
      <div className="grid sm:grid-cols-3 gap-4 mt-6">
        <div className="bg-card border border-border/60 rounded-2xl p-6">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Flame className="size-4 text-amber-500" /> Sequência
          </div>
          <div className="mt-2 font-display text-3xl font-semibold text-primary">5 dias</div>
          <p className="text-xs text-muted-foreground mt-1">Continue assim!</p>
        </div>
        <div className="bg-card border border-border/60 rounded-2xl p-6">
          <div className="text-sm text-muted-foreground">Questões hoje</div>
          <div className="mt-2 font-display text-3xl font-semibold text-primary">42 / 60</div>
          <div className="mt-3 h-1.5 bg-muted rounded-full overflow-hidden">
            <div className
