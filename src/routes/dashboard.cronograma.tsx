import { createFileRoute } from "@tanstack/react-router";
import { Check, RefreshCw } from "lucide-react";

export const Route = createFileRoute("/dashboard/cronograma")({
  component: CronogramaPage,
});

const dias = ["SEG", "TER", "QUA", "QUI", "SEX", "SÁB", "DOM"];

const planosPorDia: Array<
  Array<{ materia: string; tempo: string; cor: string; feito: boolean }>
> = [
  [
    { materia: "Direito Administrativo", tempo: "1h30", cor: "bg-blue-100 text-blue-700 border-blue-200", feito: true },
    { materia: "Português", tempo: "45m", cor: "bg-rose-100 text-rose-700 border-rose-200", feito: true },
  ],
  [
    { materia: "Direito Tributário", tempo: "2h", cor: "bg-purple-100 text-purple-700 border-purple-200", feito: true },
    { materia: "Raciocínio Lógico", tempo: "1h", cor: "bg-amber-100 text-amber-700 border-amber-200", feito: false },
  ],
  [
    { materia: "Contabilidade", tempo: "1h30", cor: "bg-emerald-100 text-emerald-700 border-emerald-200", feito: false },
    { materia: "Revisão semanal", tempo: "1h", cor: "bg-success-soft text-success border-success/30", feito: false },
  ],
  [
    { materia: "Administração", tempo: "2h", cor: "bg-cyan-100 text-cyan-700 border-cyan-200", feito: false },
  ],
  [
    { materia: "Direito Constitucional", tempo: "1h30", cor: "bg-indigo-100 text-indigo-700 border-indigo-200", feito: false },
    { materia: "Simulado", tempo: "2h", cor: "bg-success-soft text-success border-success/30", feito: false },
  ],
  [
    { materia: "Redação", tempo: "1h", cor: "bg-orange-100 text-orange-700 border-orange-200", feito: false },
  ],
  [],
];

const progresso = [
  { mat: "Direito Administrativo", pct: 78 },
  { mat: "Português", pct: 64 },
  { mat: "Direito Tributário", pct: 52 },
  { mat: "Contabilidade", pct: 41 },
  { mat: "Raciocínio Lógico", pct: 33 },
];

function CronogramaPage() {
  return (
    <div className="p-6 lg:p-12 max-w-7xl mx-auto">
      <div className="flex items-end justify-between flex-wrap gap-4 mb-8">
        <div>
          <h1 className="font-display text-3xl font-semibold text-primary tracking-tight">
            Cronograma da semana
          </h1>
          <p className="text-muted-foreground mt-1">12 a 18 de fevereiro · Semana 04 de 27</p>
        </div>
        <button className="inline-flex items-center gap-2 h-10 px-4 rounded-full bg-card border border-border text-sm font-medium hover:bg-muted">
          <RefreshCw className="size-4" /> Remarcar semana
        </button>
      </div>

      <div className="grid lg:grid-cols-[1fr_320px] gap-8">
        {/* Calendar */}
        <div className="grid grid-cols-7 gap-3">
          {dias.map((d, i) => (
            <div key={d} className="bg-card border border-border/60 rounded-2xl p-3 min-h-[200px] flex flex-col">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  {d}
                </span>
                <span className="text-xs font-bold text-primary tabular-nums">{12 + i}</span>
              </div>
              <div className="flex flex-col gap-2 flex-1">
                {planosPorDia[i].length === 0 && (
                  <div className="text-xs text-muted-foreground italic mt-3">Descanso</div>
                )}
                {planosPorDia[i].map((p, j) => (
                  <div
                    key={j}
                    className={`rounded-lg border p-2.5 text-xs ${p.cor} ${p.feito ? "opacity-60" : ""}`}
                  >
                    <div className="font-semibold leading-tight">{p.materia}</div>
                    <div className="flex items-center justify-between mt-1.5">
                      <span className="opacity-80">{p.tempo}</span>
                      {p.feito ? (
                        <Check className="size-3" />
                      ) : (
                        <button className="text-[10px] underline opacity-80 hover:opacity-100">
                          marcar
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Progress sidebar */}
        <aside className="bg-card border border-border/60 rounded-2xl p-6 h-fit">
          <h3 className="font-display font-semibold text-primary mb-5">Conclusão por matéria</h3>
          <div className="space-y-4">
            {progresso.map((p) => (
              <div key={p.mat}>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-foreground/80 font-medium">{p.mat}</span>
                  <span className="text-muted-foreground tabular-nums">{p.pct}%</span>
                </div>
                <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-success rounded-full" style={{ width: `${p.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}
