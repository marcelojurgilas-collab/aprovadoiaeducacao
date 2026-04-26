import { CheckCircle2 } from "lucide-react";

const benefits = [
  { title: "Cronograma adaptado ao seu edital", text: "Cada matéria pesada conforme a banca cobra." },
  { title: "Questões geradas por IA no estilo da banca", text: "Cespe, FGV, FCC, Vunesp — no seu nível." },
  { title: "Correção de redação com feedback detalhado", text: "Nota por critério em segundos." },
  { title: "Dashboard com seus pontos fracos", text: "Saiba exatamente onde focar amanhã." },
  { title: "Funciona para qualquer concurso do Brasil", text: "Federal, estadual, municipal, militar." },
  { title: "Mais barato que qualquer cursinho", text: "A partir de R$ 49/mês. Sem fidelidade." },
];

export function Benefits() {
  return (
    <section id="beneficios" className="py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="max-w-2xl mb-16">
          <span className="text-xs font-semibold uppercase tracking-widest text-success mb-4 block">
            Benefícios
          </span>
          <h2 className="font-display text-3xl lg:text-5xl font-semibold text-primary tracking-tight text-balance">
            Tudo que um cursinho top oferece — adaptado a você.
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-8">
          {benefits.map((b) => (
            <div key={b.title} className="flex items-start gap-4">
              <CheckCircle2 className="size-6 text-success shrink-0 mt-0.5" />
              <div>
                <h3 className="font-display font-semibold text-primary text-base mb-1">
                  {b.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{b.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
