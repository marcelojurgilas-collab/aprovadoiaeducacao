import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Check, X, ArrowRight, BarChart3 } from "lucide-react";

export const Route = createFileRoute("/dashboard/questoes")({
  component: QuestoesPage,
});

const questao = {
  enunciado:
    "Sobre o regime jurídico-administrativo e seus princípios constitucionais (art. 37, caput, da CF/88), assinale a alternativa CORRETA:",
  alternativas: [
    "A administração pública direta e indireta de qualquer dos Poderes obedece, entre outros, aos princípios da legalidade, impessoalidade, moralidade, publicidade e eficiência.",
    "O princípio da eficiência foi introduzido no art. 37 da CF apenas pela EC 45/2004.",
    "O princípio da publicidade pode ser afastado por simples ato administrativo, sem necessidade de previsão legal.",
    "A moralidade administrativa não autoriza, por si só, a invalidação de ato administrativo.",
    "A administração indireta não está sujeita ao princípio da impessoalidade.",
  ],
  correta: 0,
  explicacao:
    "A redação do art. 37, caput, da CF/88 traz expressamente os princípios LIMPE (Legalidade, Impessoalidade, Moralidade, Publicidade e Eficiência). O princípio da eficiência foi inserido pela EC 19/1998, e não pela 45/2004 — o que torna a alternativa B incorreta.",
  banca: "CESPE",
  ano: "2024",
};

function QuestoesPage() {
  const [selected, setSelected] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);

  return (
    <div className="p-6 lg:p-12 max-w-4xl mx-auto">
      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        {["Matéria: Dir. Administrativo", "Banca: CESPE", "Dificuldade: Média", "Ano: 2024"].map((f) => (
          <span
            key={f}
            className="text-xs font-medium px-3 py-1.5 rounded-full bg-card border border-border text-foreground/80"
          >
            {f}
          </span>
        ))}
        <button className="text-xs font-medium px-3 py-1.5 rounded-full text-success hover:bg-success-soft">
          + filtros
        </button>
      </div>

      <div className="flex items-center justify-between mb-4">
        <span className="text-sm text-muted-foreground">
          Questão <span className="font-semibold text-primary tabular-nums">3 de 20</span>
        </span>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span className="px-2 py-1 rounded bg-muted">{questao.banca}</span>
          <span>{questao.ano}</span>
        </div>
      </div>

      <div className="bg-card border border-border/60 rounded-3xl p-8 lg:p-10">
        <p className="font-display text-lg lg:text-xl text-primary leading-relaxed">
          {questao.enunciado}
        </p>

        <div className="mt-8 space-y-3">
          {questao.alternativas.map((alt, i) => {
            const letras = ["A", "B", "C", "D", "E"];
            const isSelected = selected === i;
            const isCorrect = revealed && i === questao.correta;
            const isWrong = revealed && isSelected && i !== questao.correta;
            return (
              <button
                key={i}
                disabled={revealed}
                onClick={() => {
                  setSelected(i);
                  setRevealed(true);
                }}
                className={`w-full text-left flex gap-4 p-4 rounded-2xl border-2 transition-colors ${
                  isCorrect
                    ? "border-success bg-success-soft"
                    : isWrong
                    ? "border-destructive bg-destructive/10"
                    : isSelected
                    ? "border-primary bg-muted"
                    : "border-border hover:border-success/40 hover:bg-muted/50"
                }`}
              >
                <span
                  className={`size-8 rounded-lg shrink-0 flex items-center justify-center font-display font-semibold text-sm ${
                    isCorrect
                      ? "bg-success text-success-foreground"
                      : isWrong
                      ? "bg-destructive text-destructive-foreground"
                      : "bg-muted text-primary"
                  }`}
                >
                  {isCorrect ? <Check className="size-4" /> : isWrong ? <X className="size-4" /> : letras[i]}
                </span>
                <span className="text-sm text-foreground/90 leading-relaxed">{alt}</span>
              </button>
            );
          })}
        </div>

        {revealed && (
          <div className="mt-8 p-5 rounded-2xl bg-success-soft border border-success/30">
            <div className="text-xs font-semibold uppercase tracking-wider text-success mb-2">
              Explicação
            </div>
            <p className="text-sm text-foreground/90 leading-relaxed">{questao.explicacao}</p>
          </div>
        )}

        <div className="mt-8 flex justify-between gap-3">
          <button className="inline-flex items-center gap-2 h-11 px-5 rounded-full text-sm font-medium text-muted-foreground hover:bg-muted">
            <BarChart3 className="size-4" /> Estatísticas
          </button>
          <button
            onClick={() => {
              setSelected(null);
              setRevealed(false);
            }}
            className="inline-flex items-center gap-2 h-11 px-6 rounded-full bg-success text-success-foreground text-sm font-medium hover:bg-success/90 shadow-soft"
          >
            Próxima questão <ArrowRight className="size-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
