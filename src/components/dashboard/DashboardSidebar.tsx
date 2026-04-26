import { Link, useLocation, useNavigate } from "@tanstack/react-router";
import {
  Home,
  Target,
  CalendarDays,
  HelpCircle,
  PenLine,
  BarChart3,
  LogOut,
  Flame,
} from "lucide-react";
import { supabase } from "@/lib/supabase";

type Item = { to: string; label: string; icon: typeof Home; exact?: boolean };

const items: Item[] = [
  { to: "/dashboard", label: "Início", icon: Home, exact: true },
  { to: "/dashboard/concurso", label: "Meu Concurso", icon: Target },
  { to: "/dashboard/cronograma", label: "Cronograma", icon: CalendarDays },
  { to: "/dashboard/questoes", label: "Questões", icon: HelpCircle },
  { to: "/dashboard/redacao", label: "Redação", icon: PenLine },
  { to: "/dashboard/desempenho", label: "Desempenho", icon: BarChart3 },
];

export function DashboardSidebar() {
  const location = useLocation();
  const path = location.pathname;
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate({ to: "/" });
  };

  return (
    <aside className="hidden lg:flex flex-col w-64 border-r border-border/60 bg-sidebar p-6 sticky top-0 h-dvh">
      <Link to="/" className="flex items-center gap-2 mb-10">
        <div className="size-7 rounded-lg bg-primary flex items-center justify-center">
          <span className="text-primary-foreground font-display font-semibold text-sm">A</span>
        </div>
        <span className="font-display font-semibold text-primary text-xl">AprovadoIA</span>
      </Link>

      <nav className="flex flex-col gap-1 flex-1">
        {items.map((it) => {
          const Icon = it.icon;
          const active = it.exact ? path === it.to : path.startsWith(it.to);
          return (
            <Link
              key={it.to}
              to={it.to}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                active
                  ? "bg-success-soft text-success"
                  : "text-muted-foreground hover:bg-muted hover:text-primary"
              }`}
            >
              <Icon className="size-4" />
              {it.label}
            </Link>
          );
        })}
      </nav>

      <div className="bg-card border border-border/60 rounded-2xl p-4">
        <div className="flex items-center gap-2 text-sm font-medium text-primary">
          <Flame className="size-4 text-amber-500" />
          5 dias seguidos
        </div>
        <div className="mt-2 h-1.5 bg-muted rounded-full overflow-hidden">
          <div className="h-full bg-success w-[71%]" />
        </div>
        <p className="mt-2 text-xs text-muted-foreground">Mantenha sua sequência!</p>
      </div>

      <button
        onClick={handleLogout}
        className="mt-4 w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-muted-foreground hover:text-primary hover:bg-muted transition-colors"
      >
        <LogOut className="size-4" />
        Sair
      </button>
    </aside>
  );
}

export function MobileTabBar() {
  const location = useLocation();
  const path = location.pathname;
  return (
    <nav className="lg:hidden fixed bottom-0 inset-x-0 z-30 bg-card border-t border-border/60 grid grid-cols-6 px-2 py-2">
      {items.map((it) => {
        const Icon = it.icon;
        const active = it.exact ? path === it.to : path.startsWith(it.to);
        return (
          <Link
            key={it.to}
            to={it.to}
            className={`flex flex-col items-center gap-1 py-1 text-[10px] font-medium ${
              active ? "text-success" : "text-muted-foreground"
            }`}
          >
            <Icon className="size-5" />
            <span className="truncate">{it.label.split(" ")[0]}</span>
          </Link>
        );
      })}
    </nav>
  );
}
