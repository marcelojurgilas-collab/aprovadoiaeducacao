import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowLeft, Loader2, Clock, BookOpen, CalendarDays } from "lucide-react";
import { supabase } from "@/lib/supabase";

type Disciplina = {
  nome: string;
  peso: string;
  carga_horaria: string;
  duracao_semanas?: number;
  topicos: string[];
  dicas?: string;
};

type BlocoSemana = {
  dia: string;
  blocos: { horario: string; disciplina: string; atividade: string }[];
};

type PlanoJson = {
  titulo: string;
  nome_concurso: string;
  duracao_total: string;
  horas_diarias_sugeridas: string;
  resumo: string;
  disciplinas: Disciplina[];
  cronograma_semanal: BlocoSemana[];
};

type PlanoRow = {
  id: string;
  nome_concurso: string;
  created_at: string;
  plano_json: PlanoJson;
};

export const Route = createFileRoute("/dashboard/planos/$id")({
  head: () => ({ meta: [{ title: "Plano — AprovadoIA" }] }),
  component: PlanoDetailPage,
});

function PlanoDetailPage() {
  const { id } = Route.useParams();
  const [plano, setPlano] = useState<PlanoRow | null>(null);
  const [erro, setErro] = useState("");
  const [aba, setAba] = useState<"disciplinas" | "cronograma">("disciplinas");

  useEffect(() => {
    supabase
      .from("planos")
      .select("id, nome_concurso, created_at, plano_json")
      .eq("id", id)
      .single()
      .then(({ data, error }) => {
        if (error || !data) setErro("Plano não encontrado.");
        else setPlano(data as PlanoRow);
      });
  }, [id]);

  if (erro) {
    return (
      <div className="p-12 text-center">
        <p className="text-destructive">{erro}</p>
        <Link to="/dashboard/planos" className="mt-4 inline-block text-success hover:underline">
          Voltar
        </Link>
      </div>
    );
  }

  if (!plano) {
    return (
      <div className="flex justify-center py-16">
        <Loader2 className="size-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  const p = plano.plano_json;

  return (
    <div className="p-6 lg:p-12 max-w-5xl mx-auto">
      <Link to="/dashboard/planos" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary">
        <ArrowLeft className="size-4" /> Meus planos
      </Link>

      <div className="mt-4 bg-primary text-primary-foreground rounded-3xl p-8 lg:p-10 relative overflow-hidden">
        <div className="absolute top-0 right-0 size-[400px] bg-success/30 blur-[120px] rounded-full" />
        <div className="relative">
          <p className="text-sm text-primary-foreground/70">{plano.nome_concurso}</p>
          <h1 className="font-display text-3xl lg:text-4xl font-semibold mt-2 tracking-tight">
            {p.titulo}
          </h1>
          <p className="mt-3 text-primary-foreground/80 max-w-2xl">{p.resumo}</p>
          <div className="mt-6 flex flex-wrap gap-3 text-sm">
            <span className="inline-flex items-center gap-1.5 bg-primary-foreground/10 px-3 py-1.5 rounded-full">
              <Clock className="size-3.5" /> {p.duracao_total}
            </span>
            <span className="inline-flex items-center gap-1.5 bg-primary-foreground/10 px-3 py-1.5 rounded-full">
              <BookOpen className="size-3.5" /> {p.horas_diarias_sugeridas}/dia
            </span>
            <span className="inline-flex items-center gap-1.5 bg-primary-foreground/10 px-3 py-1.5 rounded-full">
              <CalendarDays className="size-3.5" /> {p.disciplinas.length} disciplinas
            </span>
          </div>
        </div>
      </div>

      <div className="mt-8 flex gap-2 border-b border-border">
        {(["disciplinas", "cronograma"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setAba(t)}
            className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors -mb-px ${
              aba === t
                ? "border-success text-success"
                : "border-transparent text-muted-foreground hover:text-primary"
            }`}
          >
            {t === "disciplinas" ? "Disciplinas" : "Cronograma semanal"}
          </button>
        ))}
      </div>

      <div className="mt-6">
        {aba === "disciplinas" ? (
          <div className="space-y-4">
            {p.disciplinas.map((d, i) => (
              <div key={i} className="bg-card border border-border/60 rounded-2xl p-6">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-display text-lg font-semibold text-primary">{d.nome}</h3>
                  <div className="flex gap-2 text-xs">
                    <span className="bg-success-soft text-success px-2.5 py-1 rounded-full font-medium">
                      {d.peso}
                    </span>
                    <span className="bg-muted text-muted-foreground px-2.5 py-1 rounded-full font-medium">
                      {d.carga_horaria}
                    </span>
                  </div>
                </div>
                {d.topicos.length > 0 && (
                  <ul className="mt-4 grid sm:grid-cols-2 gap-2">
                    {d.topicos.map((t, j) => (
                      <li key={j} className="text-sm text-muted-foreground flex gap-2">
                        <span className="size-1.5 bg-success rounded-full mt-1.5 shrink-0" />
                        {t}
                      </li>
                    ))}
                  </ul>
                )}
                {d.dicas && (
                  <p className="mt-4 text-sm text-muted-foreground italic">💡 {d.dicas}</p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {p.cronograma_semanal.map((dia, i) => (
              <div key={i} className="bg-card border border-border/60 rounded-2xl p-6">
                <h3 className="font-display text-lg font-semibold text-primary">{dia.dia}</h3>
                <div className="mt-3 space-y-2">
                  {dia.blocos.map((b, j) => (
                    <div
                      key={j}
                      className="flex flex-wrap gap-x-4 gap-y-1 text-sm border-l-2 border-success pl-3 py-1"
                    >
                      <span className="font-mono text-xs text-muted-foreground">{b.horario}</span>
                      <span className="font-medium text-primary">{b.disciplina}</span>
                      <span className="text-muted-foreground">{b.atividade}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
