import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Sparkles } from "lucide-react";

export const Route = createFileRoute("/dashboard/redacao")({
  component: RedacaoPage,
});

const criterios = [
  { nome: "Estrutura", nota: 8.5 },
  { nome: "Argumentação", nota: 7.8 },
  { nome: "Gramática", nota: 9.2 },
  { nome: "Tema", nota: 8.0 },
];

function RedacaoPage() {
  const [tipo, setTipo] = useState("Dissertativa");
  const [tema, setTema] = useState("");
  const [texto, setTexto] = useState("");
  const [corrigido, setCorrigido] = useState(false);

  const media = (criterios.reduce((a, b) => a + b.nota, 0) / criterios.length).toFixed(1);

  return (
    <div className="p-6 lg:p-12 max-w-5xl mx-auto">
      <h1 className="font-display text-3xl font-semibold text-primary tracking-tight">Redação</h1>
      <p className="text-muted-foreground mt-1">
        Escreva sua redação e receba correção detalhada por IA em segundos.
      </p>

      <div className="mt-8 grid lg:grid-cols-[1.5fr_1fr] gap-6">
        <div className="bg-card border border-border/60 rounded-3xl p-6 lg:p-8">
          <div className="flex flex-wrap items-center gap-3">
            <label className="text-xs font-semibold uppercase tracking-wider text-primary">
              Tipo
            </label>
            <select
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
              className="h-10 px-3 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-success/40"
            >
              <option>Dissertativa</option>
              <option>Discursiva</option>
            </select>
          </div>

          <input
            value={tema}
            onChange={(e) => setTema(e.target.value)}
            placeholder="Cole o enunciado ou digite o tema da redação"
            className="mt-5 w-full h-12 px-4 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-success/40"
          />

          <textarea
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
            placeholder="Digite sua redação aqui..."
            rows={14}
            className="mt-4 w-full p-4 rounded-2xl border border-input bg-background text-sm leading-relaxed font-serif resize-none focus:outline-none focus:ring-2 focus:ring-success/40"
          />

          <div className="mt-4 flex items-center justify-between">
            <span className="text-xs text-muted-foreground tabular-nums">
              {texto.split(/\s+/).filter(Boolean).length} palavras
            </span>
            <button
              onClick={() => setCorrigido(true)}
              className="inline-flex items-center gap-2 h-12 px-6 rounded-full bg-success text-success-foreground font-medium hover:bg-success/90 shadow-soft"
            >
              <Sparkles className="size-4" /> Corrigir com IA
            </button>
          </div>
        </div>

        <aside className="bg-card border border-border/60 rounded-3xl p-6 lg:p-8 h-fit">
          {!corrigido ? (
            <div className="text-center py-12">
              <div className="size-14 rounded-2xl bg-muted mx-auto flex items-center justify-center">
                <Sparkles className="size-6 text-muted-foreground" />
              </div>
              <h3 className="font-display font-semibold text-primary mt-4">Aguardando correção</h3>
              <p className="text-sm text-muted-foreground mt-2">
                Escreva sua redação e clique em "Corrigir com IA".
              </p>
            </div>
          ) : (
            <div>
              <div className="text-center pb-5 border-b border-border">
                <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Nota final
                </div>
                <div className="font-display text-5xl font-semibold text-success mt-1 tabular-nums">
                  {media}
                </div>
                <div className="text-xs text-muted-foreground">de 10.0</div>
              </div>

              <div className="mt-5 space-y-4">
                {criterios.map((c) => (
                  <div key={c.nome}>
                    <div className="flex justify-between text-xs mb-1.5">
                      <span className="font-medium text-foreground/80">{c.nome}</span>
                      <span className="font-semibold text-primary tabular-nums">{c.nota}</span>
                    </div>
                    <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-success"
                        style={{ width: `${(c.nota / 10) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 rounded-2xl bg-warmth/40 border border-amber-200">
                <div className="text-xs font-semibold uppercase tracking-wider text-amber-700 mb-1.5">
                  Sugestão
                </div>
                <p className="text-sm text-foreground/90 leading-relaxed">
                  Sua argumentação está sólida, mas o terceiro parágrafo poderia trazer um dado
                  estatístico para reforçar. Cuidado com vírgulas em orações subordinadas.
                </p>
              </div>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
