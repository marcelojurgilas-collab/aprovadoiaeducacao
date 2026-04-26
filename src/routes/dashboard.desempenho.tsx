import { createFileRoute } from "@tanstack/react-router";
import { TrendingUp, AlertCircle } from "lucide-react";

export const Route = createFileRoute("/dashboard/desempenho")({
  component: DesempenhoPage,
});

const semanas = [42, 51, 48, 55, 62, 68, 74];
const max = Math.max(...semanas);

const materias = [
  { nome: "Português", pct: 82, color: "bg-emerald-500" },
  { nome: "Direito Constitucional", pct: 76, color: "bg-blue-500" },
  { nome: "Raciocínio Lógico", pct: 68, color: "bg-amber-500" },
  { nome: "Direito Administrativo", pct: 51, color: "bg-orange-500" },
  { nome: "Contabilidade", pct: 38, color: "bg-rose-500" },
];

const sessoes = [
  { dia: "Hoje", mat: "Direito Administrativo", tempo: "1h 20min", q: 25 },
  { dia: "Ontem", mat: "Português", tempo: "45min", q: 18 },
  { dia: "2 dias atrás", mat: "Raciocínio Lógico", tempo: "1h", q: 22 },
  { dia: "3 dias atrás", mat: "Direito Constitucional", tempo: "1h 30min", q: 30 },
];

function DesempenhoPage() {
  return (
    <div className="p-6 lg:p-12 max-w-6xl mx-auto">
      <h1 className="font-display text-3xl font-semibold text-primary tracking-tight">
        Seu desempenho
      </h1>
      <p className="text-muted-foreground mt-1">Veja sua evolução e onde focar.</p>

      {/* Top stats */}
      <div className="grid sm:grid-cols-3 gap-4 mt-8">
        {[
          { label: "Taxa de acerto", v: "74%", sub: "+6% essa semana", color: "text-success" },
          { label: "Questões totais", v: "1.248", sub: "Esse mês: 312", color: "text-primary" },
          { label: "Horas estudadas", v: "84h", sub: "Média 3h/dia", color: "text-primary" },
        ].map((s) => (
          <div key={s.label} className="bg-card border border-border/60 rounded-2xl p-6">
            <div className="text-sm text-muted-foreground">{s.label}</div>
            <div className={`mt-2 font-display text-3xl font-semibold ${s.color}`}>{s.v}</div>
            <div className="text-xs text-muted-foreground mt-1">{s.sub}</div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mt-6">
        {/* Line chart (SVG) */}
        <div className="bg-card border border-border/60 rounded-3xl p-6 lg:p-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-display font-semibold text-primary">Evolução semanal</h3>
              <p className="text-xs text-muted-foreground">% de acertos por semana</p>
            </div>
            <TrendingUp className="size-5 text-success" />
          </div>
          <svg viewBox="0 0 280 120" className="w-full h-44">
            <defs>
              <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="oklch(0.72 0.18 145)" stopOpacity="0.3" />
                <stop offset="100%" stopColor="oklch(0.72 0.18 145)" stopOpacity="0" />
              </linearGradient>
            </defs>
            {(() => {
              const pts = semanas.map((v, i) => {
                const x = (i / (semanas.length - 1)) * 280;
                const y = 120 - (v / max) * 100 - 5;
                return `${x},${y}`;
              });
              const path = "M " + pts.join(" L ");
              const fill = path + ` L 280,120 L 0,120 Z`;
              return (
                <>
                  <path d={fill} fill="url(#grad)" />
                  <path
                    d={path}
                    fill="none"
                    stroke="oklch(0.72 0.18 145)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  {pts.map((p, i) => {
                    const [x, y] = p.split(",");
                    return <circle key={i} cx={x} cy={y} r="3.5" fill="oklch(0.72 0.18 145)" />;
                  })}
                </>
              );
            })()}
          </svg>
          <div className="flex justify-between text-[10px] text-muted-foreground mt-2 font-medium">
            {["S1", "S2", "S3", "S4", "S5", "S6", "S7"].map((s) => (
              <span key={s}>{s}</span>
            ))}
          </div>
        </div>

        {/* Donut */}
        <div className="bg-card border border-border/60 rounded-3xl p-6 lg:p-8">
          <h3 className="font-display font-semibold text-primary mb-6">
            Distribuição de acertos
          </h3>
          <div className="flex items-center gap-6">
            <svg viewBox="0 0 42 42" className="size-36 -rotate-90">
              {(() => {
                const colors = ["#10b981", "#3b82f6", "#f59e0b", "#f97316", "#f43f5e"];
                let offset = 0;
                const total = materias.reduce((a, b) => a + b.pct, 0);
                return materias.map((m, i) => {
                  const dash = (m.pct / total) * 100;
                  const c = (
                    <circle
                      key={m.nome}
                      cx="21"
                      cy="21"
                      r="15.91549"
                      fill="transparent"
                      stroke={colors[i]}
                      strokeWidth="6"
                      strokeDasharray={`${dash} ${100 - dash}`}
                      strokeDashoffset={-offset}
                    />
                  );
                  offset += dash;
                  return c;
                });
              })()}
            </svg>
            <div className="flex-1 space-y-2">
              {materias.map((m, i) => (
                <div key={m.nome} className="flex items-center gap-2 text-xs">
                  <span className={`size-2.5 rounded-full ${m.color}`} />
                  <span className="flex-1 truncate text-foreground/80">{m.nome}</span>
                  <span className="tabular-nums text-muted-foreground">{m.pct}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Ranking */}
      <div className="bg-card border border-border/60 rounded-3xl p-6 lg:p-8 mt-6">
        <h3 className="font-display font-semibold text-primary mb-5">
          Da matéria mais fraca para a mais forte
        </h3>
        <div className="space-y-4">
          {[...materias].reverse().map((m) => (
            <div key={m.nome}>
              <div className="flex justify-between text-sm mb-1.5">
                <span className="font-medium text-foreground/90">{m.nome}</span>
                <span className="text-muted-foreground tabular-nums">{m.pct}%</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div className={`h-full ${m.color} rounded-full`} style={{ width: `${m.pct}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recommendation */}
      <div className="mt-6 bg-warmth/40 border border-amber-200 rounded-2xl p-6 flex gap-4 items-start">
        <div className="size-10 rounded-xl bg-amber-100 flex items-center justify-center shrink-0">
          <AlertCircle className="size-5 text-amber-700" />
        </div>
        <div>
          <h3 className="font-display font-semibold text-primary">Foco recomendado</h3>
          <p className="text-sm text-foreground/80 mt-1">
            Você precisa focar mais em <strong>Contabilidade</strong> (38%) e{" "}
            <strong>Direito Administrativo</strong> (51%). Adicionei mais 30 minutos dessas matérias
            ao seu cronograma da próxima semana.
          </p>
        </div>
      </div>

      {/* Sessions */}
      <h3 className="font-display text-xl font-semibold text-primary mt-12 mb-4">
        Histórico de sessões
      </h3>
      <div className="bg-card border border-border/60 rounded-3xl divide-y divide-border overflow-hidden">
        {sessoes.map((s, i) => (
          <div key={i} className="flex items-center justify-between p-5">
            <div>
              <div className="font-medium text-primary">{s.mat}</div>
              <div className="text-xs text-muted-foreground mt-0.5">{s.dia}</div>
            </div>
            <div className="flex gap-6 text-sm">
              <div>
                <div className="text-xs text-muted-foreground">Tempo</div>
                <div className="font-medium tabular-nums">{s.tempo}</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Questões</div>
                <div className="font-medium tabular-nums">{s.q}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
