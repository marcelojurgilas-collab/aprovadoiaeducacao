import { Target, CalendarDays, Rocket } from "lucide-react";

const steps = [
  {
    n: "01",
    accent: "bg-[#60a5fa]",
    icon: Target,
    title: "Escolha seu concurso",
    text: "Digite o concurso que você quer passar. Receita Federal, PRF, INSS, BB — temos todos.",
  },
  {
    n: "02",
    accent: "bg-success",
    icon: CalendarDays,
    title: "Receba seu cronograma",
    text: "A IA monta seu plano de estudos baseado no edital e no seu tempo disponível.",
  },
  {
    n: "03",
    accent: "bg-amber-400",
    icon: Rocket,
    title: "Estude e evolua",
    text: "Questões inéditas, correção de redação e relatório de desempenho em tempo real.",
  },
];

export function HowItWorks() {
  return (
    <section id="como-funciona" className="bg-card border-y border-border/60 py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="max-w-2xl mb-16">
          <span className="text-xs font-semibold uppercase tracking-widest text-success mb-4 block">
            Como funciona
          </span>
          <h2 className="font-display text-3xl lg:text-5xl font-semibold text-primary tracking-tight text-balance">
            O caminho mais claro até a sua posse.
          </h2>
          <p className="text-muted-foreground text-lg mt-5 text-pretty">
            Do primeiro acesso ao dia da prova, nossa IA atua como um mentor incansável
            organizando o caos do edital em passos diários realizáveis.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {steps.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.n}
                className="relative bg-background rounded-3xl p-8 lg:p-10 border border-border/60 flex flex-col transition-shadow hover:shadow-lg hover:shadow-border/50"
              >
                <div
                  className={`absolute top-0 left-8 lg:left-10 right-8 lg:right-10 h-1.5 rounded-b-lg ${s.accent}`}
                />
                <div className="flex items-center justify-between mb-8">
                  <span className="font-display text-5xl text-muted-foreground/30 font-medium tracking-tighter tabular-nums">
                    {s.n}
                  </span>
                  <div className="size-12 rounded-2xl bg-success-soft flex items-center justify-center">
                    <Icon className="size-5 text-success" />
                  </div>
                </div>
                <h3 className="font-display text-xl font-semibold text-primary mb-3 tracking-tight">
                  {s.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed max-w-[30ch]">
                  {s.text}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
