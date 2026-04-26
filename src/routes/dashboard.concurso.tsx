import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Search, ArrowLeft, ArrowRight, Sparkles, Check } from "lucide-react";

export const Route = createFileRoute("/dashboard/concurso")({
  component: ConcursoWizard,
});

const concursos = [
  "Receita Federal — Auditor Fiscal",
  "PRF — Polícia Rodoviária Federal",
  "Banco do Brasil — Escriturário",
  "INSS — Técnico do Seguro Social",
  "Polícia Federal — Agente",
  "Tribunais (TRT, TJ, TRF)",
];

const materiasOpts = [
  "Português",
  "Matemática",
  "Raciocínio Lógico",
  "Direito Constitucional",
  "Direito Administrativo",
  "Informática",
  "Atualidades",
  "Inglês",
];

function ConcursoWizard() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [data, setData] = useState({
    concurso: "",
    dataProva: "",
    horas: 3,
    dominadas: [] as string[],
  });

  const total = 4;

  return (
    <div className="p-6 lg:p-12 max-w-3xl mx-auto">
      <h1 className="font-display text-3xl font-semibold text-primary tracking-tight">
        Vamos montar seu plano
      </h1>
      <p className="text-muted-foreground mt-2">
        Responda 4 perguntas e a IA cria um cronograma exclusivo pra você.
      </p>

      {/* Stepper */}
      <div className="mt-8 flex items-center gap-2">
        {Array.from({ length: total }).map((_, i) => (
          <div
            key={i}
            className={`h-2 flex-1 rounded-full ${i < step ? "bg-success" : "bg-muted"}`}
          />
        ))}
      </div>
      <p className="mt-3 text-xs uppercase tracking-wider text-muted-foreground font-medium">
        Passo {step} de {total}
      </p>

      <div className="mt-8 bg-card border border-border/60 rounded-3xl p-8 lg:p-10">
        {step === 1 && (
          <div>
            <h2 className="font-display text-xl font-semibold text-primary">
              Qual concurso você quer passar?
            </h2>
            <div className="mt-6 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <input
                value={data.concurso}
                onChange={(e) => setData({ ...data, concurso: e.target.value })}
                placeholder="Ex: Receita Federal"
                className="w-full h-12 pl-11 pr-4 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-success/40"
              />
            </div>
            <div className="mt-4 grid sm:grid-cols-2 gap-2">
              {concursos.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setData({ ...data, concurso: c })}
                  className={`text-left text-sm px-4 py-3 rounded-xl border transition-colors ${
                    data.concurso === c
                      ? "border-success bg-success-soft text-success"
                      : "border-border hover:border-success/40"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <h2 className="font-display text-xl font-semibold text-primary">
              Qual a data prevista da prova?
            </h2>
            <p className="text-sm text-muted-foreground mt-2">
              Se ainda não saiu o edital, estime uma data.
            </p>
            <input
              type="date"
              value={data.dataProva}
              onChange={(e) => setData({ ...data, dataProva: e.target.value })}
              className="mt-6 w-full h-12 px-4 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-success/40"
            />
          </div>
        )}

        {step === 3 && (
          <div>
            <h2 className="font-display text-xl font-semibold text-primary">
              Quantas horas por dia você pode estudar?
            </h2>
            <div className="mt-8 text-center">
              <div className="font-display text-6xl font-semibold text-success tabular-nums">
                {data.horas}h
              </div>
              <p className="text-sm text-muted-foreground mt-2">por dia</p>
            </div>
            <input
              type="range"
              min={1}
              max={8}
              value={data.horas}
              onChange={(e) => setData({ ...data, horas: Number(e.target.value) })}
              className="mt-6 w-full accent-success"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-2">
              <span>1h</span>
              <span>8h</span>
            </div>
          </div>
        )}

        {step === 4 && (
          <div>
            <h2 className="font-display text-xl font-semibold text-primary">
              Quais matérias você já domina?
            </h2>
            <p className="text-sm text-muted-foreground mt-2">
              Isso ajuda a IA a focar onde você precisa.
            </p>
            <div className="mt-6 grid sm:grid-cols-2 gap-2">
              {materiasOpts.map((m) => {
                const checked = data.dominadas.includes(m);
                return (
                  <button
                    key={m}
                    type="button"
                    onClick={() =>
                      setData({
                        ...data,
                        dominadas: checked
                          ? data.dominadas.filter((x) => x !== m)
                          : [...data.dominadas, m],
                      })
                    }
                    className={`flex items-center gap-3 text-left text-sm px-4 py-3 rounded-xl border transition-colors ${
                      checked
                        ? "border-success bg-success-soft text-success"
                        : "border-border hover:border-success/40"
                    }`}
                  >
                    <span
                      className={`size-5 rounded-md border-2 flex items-center justify-center shrink-0 ${
                        checked ? "bg-success border-success" : "border-border"
                      }`}
                    >
                      {checked && <Check className="size-3 text-success-foreground" />}
                    </span>
                    {m}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        <div className="mt-10 flex justify-between gap-3">
          <button
            disabled={step === 1}
            onClick={() => setStep((s) => s - 1)}
            className="inline-flex items-center gap-2 h-11 px-5 rounded-full text-sm font-medium text-muted-foreground hover:bg-muted disabled:opacity-40"
          >
            <ArrowLeft className="size-4" /> Voltar
          </button>
          {step < total ? (
            <button
              onClick={() => setStep((s) => s + 1)}
              className="inline-flex items-center gap-2 h-11 px-6 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90"
            >
              Próximo <ArrowRight className="size-4" />
            </button>
          ) : (
            <button
              onClick={() => navigate({ to: "/dashboard/cronograma" })}
              className="inline-flex items-center gap-2 h-12 px-7 rounded-full bg-success text-success-foreground text-sm font-medium hover:bg-success/90 shadow-soft"
            >
              <Sparkles className="size-4" /> Gerar meu cronograma com IA
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
